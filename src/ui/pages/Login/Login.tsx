import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export const Login = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  // const redirectUri = isLocalhost ? 'http://localhost:3001/home' : 'https://contavet.online/home';
  const redirectUri = isLocalhost ? 'http://localhost:3001/' : 'https://contavet.online/';
  const loginMode = 'popup'; // popup ou redirect
  console.info('REDIRECT URI: ', redirectUri);

  const login = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: redirectUri,
    ux_mode: loginMode,
    onSuccess: async (codeResponse) => {
      console.info('RESSPONSE', codeResponse);
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: codeResponse.code,
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID || '',
          client_secret: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET || '',
          redirect_uri: redirectUri,
          // scope: codeResponse.scope,
        }),
      }).then((res) => res.json());
      console.info('token', tokenResponse);
      console.info('TOKEN DECODIFICADO', jwtDecode(tokenResponse.id_token));
    },
    onError: (error) => console.info('Login Failed:', error),
    onNonOAuthError: (error) => console.info('Non OAuth Error:', error),
  });

  const logOut = () => {
    googleLogout();
  };

  return (
    <>
      <h1>LOGIN PAGE - {loginMode}</h1>
      <div>
        <button onClick={() => login()}>Login com Google</button>
      </div>
      <div>
        <button onClick={logOut}>Logout</button>
      </div>
    </>
  );
};
