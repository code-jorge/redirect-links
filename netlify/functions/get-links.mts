import { getStore } from '@netlify/blobs';

const store = getStore('links');
const TOKEN = process.env.TOKEN;

const read = async (req: Request)=> {
  const token = req.headers.get('Authorization');
  if (token !== TOKEN) return new Response('Unauthorized', { status: 401 });
  const links = await store.list();
  const linkData = await Promise.all(
    links.blobs.map(async ({ key }) => {
      const data = await store.get(key);
      return data || '{}';
    })
  );
  return new Response(JSON.stringify(linkData), { status: 200 });
}

export default read;

export const config = {
  method: "GET",
  path: "/api/links"
}