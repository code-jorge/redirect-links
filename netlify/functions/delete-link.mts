import { getStore } from "@netlify/blobs";

const TOKEN = process.env.TOKEN;

const remove = async (req: Request)=> {
  const store = getStore({ name: 'links', consistency: 'strong' });
  const token = req.headers.get('Authorization');
  if (token !== TOKEN) return new Response('Unauthorized', { status: 401 });
  const { id } = await req.json();
  const link = await store.get(`link:${id}`);
  if (!link) return new Response('Not Found', { status: 404 });
  await store.delete(`link:${id}`);
  return new Response(null, { status: 204 });
}

export default remove;

export const config = {
  method: "DELETE",
  path: "/api/links"
}