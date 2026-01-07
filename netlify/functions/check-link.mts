import { getStore } from '@netlify/blobs';

const TOKEN = process.env.TOKEN;

const check = async (req: Request)=> {
  const store = getStore({ name: 'links', consistency: 'strong' });
  const token = req.headers.get('Authorization');
  if (token !== TOKEN) return new Response('Unauthorized', { status: 401 });
  const { shortCode } = await req.json();
  if (!shortCode) return new Response(JSON.stringify({ exists: false }), { status: 200 });
  const link = await store.get(`link:${shortCode}`);
  return new Response(JSON.stringify({ exists: !!link }), { status: 200 });
}

export default check;

export const config = {
  method: "POST",
  path: "/api/links/check"
}
