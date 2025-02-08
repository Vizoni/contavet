import { AuthContext } from 'contexts/AuthContext/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useUser deve ser usado dentro de um AuthProvider');
  return context;
};
