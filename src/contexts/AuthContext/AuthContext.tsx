import { createContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  // login: (userData: User, accessToken: string) => void;
  logout: () => void;
  validateToken: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Salva os dados no localStorage
  useEffect(() => {
    console.info('auth - use ef - storage get item');
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Atualiza o localStorage quando `user` ou `token` mudam
  useEffect(() => {
    console.info('Auth - use ef', user, token);
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  // // Função para login
  // const login = (userData: User, accessToken: string) => {
  //   setUser(userData);
  //   setToken(accessToken);
  // };

  // Função para logout
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  // Validação do token
  const validateToken = async (): Promise<boolean> => {
    if (!token) return false;

    try {
      const response = await fetch('https://oauth2.googleapis.com/tokeninfo?access_token=' + token);
      if (!response.ok) throw new Error('Token inválido');

      return true;
    } catch (error) {
      console.warn('Token expirado, renovando...');
      return await refreshToken();
    }
  };

  // Renova o token
  const refreshToken = async (): Promise<boolean> => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) return false;

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: storedToken, // Pegando o refresh_token armazenado
          client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET,
        }),
      });

      if (!response.ok) throw new Error('Erro ao renovar token');

      const data = await response.json();
      setToken(data.access_token);
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, logout, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};
