import { getLinksStore, validateAuth, isValidUrl, jsonResponse } from './lib/auth.ts';

const update = async (req: Request)=> {
  const authError = validateAuth(req);
  if (authError) return authError;
  const store = getLinksStore();
  const { id, targetUrl } = await req.json();
  if (!targetUrl || !isValidUrl(targetUrl)) {
    return jsonResponse({ error: 'Invalid URL' }, 400);
  }
  const link = await store.get(`link:${id}`);
  if (!link) return jsonResponse({ error: 'Not Found' }, 404);
  const updatedLink = { ...JSON.parse(link), targetUrl };
  await store.set(`link:${id}`, JSON.stringify(updatedLink));
  return jsonResponse(updatedLink);
}

export default update;

export const config = {
  method: "PUT",
  path: "/api/links"
}