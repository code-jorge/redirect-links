import { createContext, useContext, useState } from 'react';
import * as api from '../lib/auth';
import { useEffect } from 'react';

interface AuthContextType {
  auth: boolean;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode })=> {

  const [auth, setAuth] = useState<boolean>(false);

  useEffect(()=> {
    const token = api.getToken();
    if (token) setAuth(true);
  }, []);

  const login = async (password: string)=> {
    const token = await api.login(password);
    localStorage.setItem('token', token);
    setAuth(true);
  }

  const logout = async ()=> {
    localStorage.removeItem('token');
    setAuth(false);
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = ()=> {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}