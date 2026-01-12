import { getLinksStore, validateAuth, jsonResponse } from './lib/auth.ts';

const check = async (req: Request)=> {
  const authError = validateAuth(req);
  if (authError) return authError;
  const store = getLinksStore();
  const { shortCode } = await req.json();
  if (!shortCode) return jsonResponse({ exists: false });
  const link = await store.get(`link:${shortCode}`);
  return jsonResponse({ exists: !!link });
}

export default check;

export const config = {
  method: "POST",
  path: "/api/links/check"
}
