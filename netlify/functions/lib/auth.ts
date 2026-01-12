import { getStore } from '@netlify/blobs';

const TOKEN = process.env.TOKEN;

export const getLinksStore = () => getStore({ name: 'links', consistency: 'strong' });

export const validateAuth = (req: Request): Response | null => {
  const token = req.headers.get('Authorization');
  if (token !== TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }
  return null;
}

export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export const jsonResponse = (data: unknown, status: number = 200): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
