export const login = async (password: string)=> {
  const response = await fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.text();
}

export const getToken = (): string=> {
  return localStorage.getItem('token') || '';
}