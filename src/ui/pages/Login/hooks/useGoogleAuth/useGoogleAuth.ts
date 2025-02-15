import { useState } from 'react';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET || '';

const isLocalhost = window.location.hostname === 'localhost';
const redirectUri = isLocalhost ? 'http://localhost:3001/home' : 'https://contavet.online/home';

export const useGoogleAuth = () => {
  const [googleToken, setGoogleToken] = useState<string | null>(null);

  // Abre o popup e retorna o código de autorização
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

      const messageListener = (event: MessageEvent) => {
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

  // Obtém o token de acesso do Google
  const getGoogleAccessToken = async (code: string) => {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });

      if (!response.ok) throw new Error('Erro ao trocar código por token');

      const data = await response.json();
      return data.access_token;
    } catch (err) {
      console.error('Erro ao obter token do Google:', err);
      return null;
    }
  };

  // Obtém os dados do usuário
  const getUserData = async (code: string) => {
    try {
      const accessToken = await getGoogleAccessToken(code);
      if (!accessToken) throw new Error('Token de acesso inválido');

      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) throw new Error('Erro ao obter dados do usuário');

      return await response.json();
    } catch (err) {
      console.error('Erro ao obter dados do usuário:', err);
      return null;
    }
  };

  const loginWithPopup = async () => {
    try {
      const code = await openPopup();
      return await getUserData(code);
    } catch (err) {
      return null;
    }
  };

  // Validação do token
  const validateToken = async (): Promise<boolean> => {
    if (!googleToken) return false;

    try {
      const response = await fetch(
        'https://oauth2.googleapis.com/tokeninfo?access_token=' + googleToken
      );
      if (!response.ok) throw new Error('Token inválido');

      return true;
    } catch (error) {
      console.warn('Token expirado, renovando...');
      return await refreshToken();
    }
  };

  const clearToken = () => setGoogleToken(null);

  // Renova o token
  const refreshToken = async (): Promise<boolean> => {
    try {
      const storedToken = localStorage.getItem('authToken');
      if (!storedToken) throw new Error('Token não encontrado');

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: storedToken, // Pegando o refresh_token armazenado
          client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET,
        }),
      });

      if (!response.ok) throw new Error('Erro ao renovar token');

      const data = await response.json();
      setGoogleToken(data.access_token);
      localStorage.setItem('authToken', data.access_token);
      return true;
    } catch (error) {
      clearToken();
      return false;
    }
  };

  return { login: loginWithPopup, validateToken, refreshToken, clearToken, googleToken };
};
