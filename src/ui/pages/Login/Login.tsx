import { useGoogleAuth } from './hooks/useGoogleAuth/useGoogleAuth';

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET || '';

export const isLocalhost = window.location.hostname === 'localhost';
export const redirectUri = isLocalhost
  ? 'http://localhost:3001/home'
  : 'https://contavet.online/home';

const loginType = 'popup'; // popup ou redirect

export const Login = () => {
  const { loginWithPopup, loginWithRedirect } = useGoogleAuth();

  const handleLogin = (loginType: string) => {
    if (loginType === 'redirect') {
      loginWithRedirect();
    }
    if (loginType === 'popup') {
      loginWithPopup();
    }
  };

  return (
    <div>
      <h1>Login Mode: {loginType}</h1>
      <div>
        <button onClick={() => handleLogin(loginType)}>Login com Google</button>
      </div>
    </div>
  );
};
