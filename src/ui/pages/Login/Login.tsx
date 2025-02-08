import { useGoogleLogin } from '@react-oauth/google';

export const isLocalhost = window.location.hostname === 'localhost';
export const redirectUri = isLocalhost
  ? 'http://localhost:3001/home'
  : 'https://contavet.online/home';

export const Login = () => {
  const loginMode = 'redirect'; // popup ou redirect
  console.info('REDIRECT URI: ', redirectUri);

  const login = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: redirectUri,
    ux_mode: loginMode,
    onSuccess: async (codeResponse) => {
      // Nem entra aqui porque ele já faz o redirect_uri -> (/home)
      console.info('RESSPONSE', codeResponse);
    },
    onError: (error) => console.info('Login Failed:', error),
    onNonOAuthError: (error) => console.info('Non OAuth Error:', error),
  });

  return (
    <>
      <h1>LOGIN PAGE - {loginMode}</h1>
      <div>
        <button onClick={() => login()}>Login com Google</button>
      </div>
    </>
  );
};
