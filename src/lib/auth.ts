export const login = async (password: string)=> {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.text();
}

export const getToken = (): string=> {
  return localStorage.getItem('token') || '';
}

export const validateToken = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) return false;
  try {
    const response = await fetch('/api/links', {
      headers: { 'Authorization': token },
    });
    return response.ok;
  } catch {
    return false;
  }
}