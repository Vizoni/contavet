import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useGoogleLogin } from '@react-oauth/google';

import { Card, GoogleIcon, SignInContainer } from './Login.styled';
import { useNavigate } from 'react-router';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = useGoogleLogin({
    onSuccess: async (credentials) => {
      // TODO: Chamar uma API do back-end pra validar o google: https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898
      const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${credentials.access_token}` },
      }).then((res) => res.json());
      console.info(userInfo);
      navigate('/home');
    },
    onError: (error) => {
      console.info('Não foi possível fazer o login', error);
    },
  });

  return (
    <SignInContainer direction='column' justifyContent='space-between'>
      <Card variant='outlined'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant='outlined'
            onClick={() => handleLogin()}
            startIcon={<GoogleIcon />}
          >
            Entrar com Google
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
};
