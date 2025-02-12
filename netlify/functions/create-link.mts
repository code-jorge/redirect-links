import { getStore } from '@netlify/blobs';
import { nanoid } from 'nanoid';

const store = getStore('links');
const TOKEN = process.env.TOKEN;

const create = async (req: Request)=> {
  const token = req.headers.get('Authorization');
  if (token !== TOKEN) return new Response('Unauthorized', { status: 401 });
  const { targetUrl } = await req.json();
  const shortCode = nanoid(6);
  const link = { id: nanoid(), shortCode, targetUrl, createdAt: new Date().toISOString() };
  await store.set(`link:${shortCode}`, JSON.stringify(link));
  return new Response(JSON.stringify(link), { status: 201 });
}

export default create;

export const config = {
  method: "POST",
  path: "/api/links"
}