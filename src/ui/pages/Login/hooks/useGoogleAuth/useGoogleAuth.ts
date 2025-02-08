import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUri } from 'ui/pages/Login/Login';

export const useGoogleAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);

  const navigate = useNavigate();

  const getGoogleAccessToken = async (code: string) => {
    if (googleAccessToken) {
      return googleAccessToken;
    }
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao trocar código por token');
      }

      const data = await response.json();
      setGoogleAccessToken(data.access_token);
      return data.access_token;
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    console.info('google token', googleAccessToken);
  }, [googleAccessToken]);

  const getUserData = async (code: string) => {
    try {
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${await getGoogleAccessToken(code)}` },
      });

      if (!userInfoResponse.ok) {
        throw new Error('Erro ao obter dados do usuário');
      }
      const userInfo = await userInfoResponse.json();
      setUser(userInfo);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/home2');
    }
    // navigate('/');
  }, [user]);

  const openPopup = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=email%20profile`;

      const width = 500;
      const height = 600;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;

      const popup = window.open(
        authUrl,
        'google-login',
        `width=${width},height=${height},top=${top},left=${left}`
      );

      if (!popup) {
        reject(new Error('Não foi possível abrir o pop-up'));
        return;
      }

      // Escuta mensagens vindas do pop-up
      const messageListener = (event: MessageEvent) => {
        console.info('messageListener', event);
        if (event.origin !== window.location.origin) return;

        const { code } = event.data;
        if (code) {
          window.removeEventListener('message', messageListener);
          popup.close();
          resolve(code);
        }
      };

      window.addEventListener('message', messageListener);
    });
  };

  const loginWithPopup = async () => {
    try {
      const code = await openPopup();
      await getUserData(code);
    } catch (err) {
      console.error('Erro no login com popup:', err);
    }
  };

  const loginWithRedirect = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=email%20profile`;

    window.location.href = authUrl;
  };

  const logOut = () => {
    setUser(null);
    setError(null);
    navigate('/');
  };

  return { user, error, getUserData, openPopup, loginWithPopup, loginWithRedirect, logOut };
};
