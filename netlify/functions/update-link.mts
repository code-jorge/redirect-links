const TOKEN = process.env.TOKEN;

const update = async (req: Request)=> {
  const token = req.headers.get('Authorization');
  if (token !== TOKEN) return new Response('Unauthorized', { status: 401 });
  const { id, targetUrl } = await req.json();
  console.log({ id, targetUrl });
  // DO STUFF

}

export default update;

export const config = {
  method: "PUT",
  path: "/api/links"
}