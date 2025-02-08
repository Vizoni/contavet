import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';

export const isLocalhost = window.location.hostname === 'localhost';
export const redirectUri = isLocalhost
  ? 'http://localhost:3001/home'
  : 'https://contavet.online/home';

export const Login = () => {
  // const redirectUri = isLocalhost ? 'http://localhost:3001/' : 'https://contavet.online/';
  const loginMode = 'redirect'; // popup ou redirect
  console.info('REDIRECT URI: ', redirectUri);

  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: redirectUri,
    ux_mode: loginMode,
    onSuccess: async (codeResponse) => {
      console.info('RESSPONSE', codeResponse);
      navigate(`/home?id_token=${codeResponse.code}`);
      // const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     code: codeResponse.code,
      //     grant_type: 'authorization_code',
      //     client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID || '',
      //     client_secret: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET || '',
      //     redirect_uri: redirectUri,
      //     // scope: codeResponse.scope,
      //   }),
      // }).then((res) => res.json());
      // console.info('token', tokenResponse);
      // console.info('TOKEN DECODIFICADO', jwtDecode(tokenResponse.id_token));
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
