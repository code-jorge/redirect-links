import { getStore } from '@netlify/blobs';
import { nanoid } from 'nanoid';

const TOKEN = process.env.TOKEN;

const create = async (req: Request)=> {
  const store = getStore({ name: 'links', consistency: 'strong' });
  const token = req.headers.get('Authorization');
  if (token !== TOKEN) return new Response('Unauthorized', { status: 401 });
  const { targetUrl, shortCode } = await req.json();
  const code = shortCode || nanoid(6);
  const link = {
    id: code,
    shortCode: code,
    targetUrl,
    createdAt: new Date().toISOString()
  };
  await store.set(`link:${code}`, JSON.stringify(link));
  return new Response(JSON.stringify(link), { status: 201 });
}

export default create;

export const config = {
  method: "POST",
  path: "/api/links"
}