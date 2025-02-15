import { createContext, useState, type ReactNode } from 'react';
import { useGoogleAuth } from 'ui/pages/Login/hooks/useGoogleAuth/useGoogleAuth';
import type { AuthContextProps, AuthContextReturn, User } from 'utils/hooks/useAuth/useAuth.types';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const getCachedUser = (): User | null => {
    const cachedUser = localStorage.getItem('authUser');
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }
    return null;
  };

  const [user, setUser] = useState<User | null>(getCachedUser());

  const useGoogleAuthHook = useGoogleAuth();

  const logout = () => {
    setUser(null);
    useGoogleAuthHook.clearToken();
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
  };

  const login = async () => {
    const userData = await useGoogleAuthHook.login();
    if (userData) {
      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
    }
  };

  const authContextReturn: AuthContextReturn = {
    user,
    googleToken: useGoogleAuthHook.googleToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextReturn}>{children}</AuthContext.Provider>;
};
