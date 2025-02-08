import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { redirectUri } from './Login';

//  FONTE: https://github.com/anthonyjgrove/react-google-login/issues/169
export const GoogleLandingPageTemporary = () => {
  const navigate = useNavigate();

  const getUserData = async (token: string) => {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: token,
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID || '',
        client_secret: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET || '',
        redirect_uri: redirectUri,
      }),
    });
    console.info('resp', response);
    console.info('USUARIO', response.json());
    console.info('VAI ATUALIZAR PAGINAa se for 200?', response.status === 200);
    if (response.status === 200) navigate('/home2');
    return response.json();
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idToken = params.get('code');
    // const idToken = params.get('id_token');
    console.info('idToken', idToken);
    if (idToken !== null) {
      const finalUser = getUserData(idToken);
      console.info('final user', finalUser);
    } else {
      console.info('no token');
    }
  }, []);

  return (
    <div>
      <h4>Carregando...</h4>
    </div>
  );
};
