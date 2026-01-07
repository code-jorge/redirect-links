import { getStore } from "@netlify/blobs";

const TOKEN = process.env.TOKEN;

const update = async (req: Request)=> {
  const store = getStore({ name: 'links', consistency: 'strong' });
  const token = req.headers.get('Authorization');
  if (token !== TOKEN) return new Response('Unauthorized', { status: 401 });
  const { id, targetUrl } = await req.json();
  const link = await store.get(`link:${id}`);
  if (!link) return new Response('Not Found', { status: 404 });
  const updatedLink = { ...JSON.parse(link), targetUrl };
  await store.set(`link:${id}`, JSON.stringify(updatedLink));
  return new Response(JSON.stringify(updatedLink), { status: 200 });
}

export default update;

export const config = {
  method: "PUT",
  path: "/api/links"
}