import { Context } from '@netlify/edge-functions';
import { getStore } from '@netlify/blobs';

const redirect = async (request: Request, context: Context)=> {
  const store = getStore('links');
  const url = new URL(request.url);
  const shortCode = url.pathname.slice(1);
  if (!shortCode) {
    const response = await context.next();
    return response;
  }
  try {
    const link = await store.get(`link:${shortCode}`);
    if (!link) return Response.redirect('/404');
    const { targetUrl } = JSON.parse(link);
    return Response.redirect(targetUrl, 302);
  } catch (error) {
    console.error('Failed to fetch link:', error);
    return Response.redirect('/404');
  }
}

export default redirect;

export const config = {
  method: "GET",
  path: "/*"
}