import { getLinksStore, validateAuth, jsonResponse } from './lib/auth.ts';

const remove = async (req: Request)=> {
  const authError = validateAuth(req);
  if (authError) return authError;
  const store = getLinksStore();
  const { id } = await req.json();
  const link = await store.get(`link:${id}`);
  if (!link) return jsonResponse({ error: 'Not Found' }, 404);
  await store.delete(`link:${id}`);
  return new Response(null, { status: 204 });
}

export default remove;

export const config = {
  method: "DELETE",
  path: "/api/links"
}