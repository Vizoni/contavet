import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// Works for Login.tsx -> loginMode = 'redirect'
export const GoogleLandingPageTemporary = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      window.opener?.postMessage({ code }, window.origin);

      window.close();
      navigate('/home2');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <h4>Autenticando...</h4>;
};
