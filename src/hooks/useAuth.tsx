import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../lib/auth';

interface AuthContextType {
  auth: boolean;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode })=> {

  const [auth, setAuth] = useState<boolean>(false);

  useEffect(()=> {
    const checkAuth = async ()=> {
      const isValid = await api.validateToken();
      if (isValid) {
        setAuth(true);
      } else {
        localStorage.removeItem('token');
        setAuth(false);
      }
    };
    checkAuth();
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