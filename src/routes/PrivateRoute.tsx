import { type ReactNode, Suspense } from 'react';
import { Navigate } from 'react-router';

import { useAuth } from 'utils/hooks/useAuth/useAuth';

export type PrivateRouteProps = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/' replace />;
  }

  return <Suspense fallback={<h1>Carregando...</h1>}>{children}</Suspense>;
};
