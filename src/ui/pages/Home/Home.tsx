import { useAuth } from 'utils/hooks/useAuth/useAuth';

export const Home = () => {
  //   const { user, logOut } = useGoogleAuth();
  //   console.info('home - user', user);

  //   if (!user) {
  //     console.info('Usuário não autenticado');
  //     logOut();
  //   }

  const useAuthHook = useAuth();
  console.info('home2 - user', useAuthHook.user, useAuthHook.token);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => console.info('clicou')}>Sair da conta</button>
    </div>
  );
};
