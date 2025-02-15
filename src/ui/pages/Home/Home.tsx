import { useAuth } from 'utils/hooks/useAuth/useAuth';

export const Home = () => {
  const useAuthHook = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={useAuthHook.logout}>Sair da conta</button>
    </div>
  );
};
