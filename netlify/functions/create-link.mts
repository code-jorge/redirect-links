import { nanoid } from 'nanoid';
import { getLinksStore, validateAuth, isValidUrl, jsonResponse } from './lib/auth.ts';

const create = async (req: Request)=> {
  const authError = validateAuth(req);
  if (authError) return authError;
  const store = getLinksStore();
  const { targetUrl, shortCode } = await req.json();
  if (!targetUrl || !isValidUrl(targetUrl)) {
    return jsonResponse({ error: 'Invalid URL' }, 400);
  }
  const code = shortCode || nanoid(6);
  const link = {
    id: code,
    shortCode: code,
    targetUrl,
    createdAt: new Date().toISOString()
  };
  await store.set(`link:${code}`, JSON.stringify(link));
  return jsonResponse(link, 201);
}

export default create;

export const config = {
  method: "POST",
  path: "/api/links"
}