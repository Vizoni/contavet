import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from 'utils/hooks/useAuth/useAuth';

export const Login = () => {
  const useAuthHook = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (useAuthHook.user) {
      navigate('/home2');
    }
  }, [useAuthHook.user]);

  return (
    <div>
      <h1>Login</h1>
      <div>
        <button onClick={useAuthHook.login}>Login com Google</button>
      </div>
    </div>
  );
};
