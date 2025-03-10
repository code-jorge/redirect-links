
const PASSWORD = process.env.PASSWORD;
const TOKEN = process.env.TOKEN;

const auth = async (req: Request)=> {
  const { password } = await req.json();
  if (password === PASSWORD) return new Response(TOKEN, { status: 200 });
  return new Response('Unauthorized', { status: 401 });
}

export default auth;

export const config = {
  method: "POST",
  path: "/api/auth"
}