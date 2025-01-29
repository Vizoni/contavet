/* eslint-disable no-console */
/* eslint-disable no-undef */
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

// import { Card, GoogleIcon, SignInContainer } from './Login.styled';
// import { useNavigate } from 'react-router';

export const Login = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  const redirectUri = isLocalhost ? 'http://localhost:3001/home' : 'https://contavet.online/home';
  // const navigate = useNavigate();

  // return (
  //   <GoogleLogin
  //     onSuccess={(credentialResponse) => {
  //       console.log('sucesso', credentialResponse);
  //       navigate('/home');
  //     }}
  //     onError={() => {
  //       console.log('Login Failed');
  //     }}
  //   />
  // );

  // const login = useGoogleLogin({
  //   // onSuccess: (codeResponse) => console.log(codeResponse),
  //   onSuccess: async (credentials) => {
  //     console.log('On Success', credentials);
  //     // TODO: Chamar uma API do back-end pra validar o google: https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898
  //     const userInfo = await fetch(
  //       `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${credentials.code}`
  //     ).then((res) => res.json());
  //     // const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
  //     //   headers: { Authorization: `Bearer ${credentials.code}` },
  //     // }).then((res) => res.json());
  //     console.log('user info', userInfo);
  //     navigate('/home');
  //   },
  //   onError: (error) => {
  //     console.log('Não foi possível fazer o login', error);
  //   },

  //   onNonOAuthError: (error) => {
  //     console.log('Non OAuth Error', error);
  //   },
  //   flow: 'auth-code',
  // });

  const login = useGoogleLogin({
    flow: 'auth-code', // Usa authorization code flow (mais confiável)
    ux_mode: 'popup', // Abre o popup de login do Google
    onSuccess: async (codeResponse) => {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
          // 'Cross-Origin-Embedder-Policy': 'credentialless',
        },
        body: JSON.stringify({
          code: codeResponse.code,
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID || '',
          client_secret: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET || '',
          // client_id: process.env.VITE_GOOGLE_AUTH_CLIENT_ID || '',
          // client_secret: process.env.VITE_GOOGLE_AUTH_CLIENT_SECRET || '',
          // redirect_uri: 'http://localhost:3001',
          redirect_uri: redirectUri,
          scope: 'openid email profile',
          // postMessageOrigin: 'http://localhost:3001',
          // postMessage: JSON.stringify({ code: `${codeResponse.code} -- VIOZNI` }),
        }),
      }).then((res) => res.json());

      console.log('Token recebido:', tokenResponse);
      console.log('TOKEN DECODIFICADO', jwtDecode(tokenResponse.id_token));

      // if (tokenResponse.access_token) {
      //   navigate('/home'); // Agora o redirecionamento funcionará corretamente
      // }
      window.location.href = redirectUri;
    },
    onError: (error) => {
      console.log('Erro no login:', error);
    },
    onNonOAuthError: (error) => {
      console.log('Erro não OAuth:', error);
    },
    redirect_uri: redirectUri,
  });

  return <button onClick={() => login()}>Entrar com Google</button>;

  // const handleLogin = useGoogleLogin({
  //   scope: 'openid email profile',
  //   onSuccess: async (credentials) => {
  //     console.log('On Success', credentials);
  //     // TODO: Chamar uma API do back-end pra validar o google: https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898
  //     const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
  //       headers: { Authorization: `Bearer ${credentials.access_token}` },
  //     }).then((res) => res.json());
  //     console.log('user info', userInfo);
  //     navigate('/home');
  //   },
  //   onError: (error) => {
  //     console.log('Não foi possível fazer o login', error);
  //   },
  //   error_callback: (error) => {
  //     console.log('Error Callback', error);
  //   },
  //   onNonOAuthError: (error) => {
  //     console.log('Non OAuth Error', error);
  //   },
  // });

  // return (
  //   <SignInContainer direction='column' justifyContent='space-between'>
  //     <Card variant='outlined'>
  //       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
  //         <Button
  //           fullWidth
  //           variant='outlined'
  //           onClick={() => handleLogin()}
  //           startIcon={<GoogleIcon />}
  //         >
  //           Entrar com Google
  //         </Button>
  //       </Box>
  //     </Card>
  //   </SignInContainer>
  // );
};
