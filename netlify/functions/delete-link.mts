const TOKEN = process.env.TOKEN;

const remove = async (req: Request)=> {
  const token = req.headers.get('Authorization');
  if (token !== TOKEN) return new Response('Unauthorized', { status: 401 });
  const { id, targetUrl } = await req.json();
  console.log({ id });
  // DO STUFF

}

export default remove;

export const config = {
  method: "DELETE",
  path: "/api/links"
}