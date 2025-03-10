import { Context } from '@netlify/edge-functions';
import { getStore } from '@netlify/blobs';


const redirect = async (request: Request, context: Context)=> {
  const store = getStore('links');
  const url = new URL(request.url);
  const shortCode = url.pathname.slice(3);
  if (!shortCode) {
    const response = await context.next();
    return response;
  }
  const link = await store.get(`link:${shortCode}`);
  if (!link) {
    const response = await context.next();
    return response;
  }
  const { targetUrl } = JSON.parse(link);
  return new Response(targetUrl, { status: 302, headers: { Location: targetUrl } });
}

export default redirect;

export const config = {
  method: "GET",
  path: "/r/*"
}