import { getLinksStore, validateAuth, jsonResponse } from './lib/auth.ts';

const read = async (req: Request)=> {
  const authError = validateAuth(req);
  if (authError) return authError;
  const store = getLinksStore();
  const links = await store.list();
  const linkData = await Promise.all(
    links.blobs.map(async ({ key }) => {
      const data = await store.get(key);
      return JSON.parse(data || '{}');
    })
  );
  return jsonResponse(linkData);
}

export default read;

export const config = {
  method: "GET",
  path: "/api/links"
}