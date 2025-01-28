import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Card, GoogleIcon, SignInContainer } from './Login.styled';

export const Login = () => (
  <SignInContainer direction='column' justifyContent='space-between'>
    <Card variant='outlined'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant='outlined'
          onClick={() => alert('Sign in with Google')}
          startIcon={<GoogleIcon />}
        >
          Entrar com Google
        </Button>
      </Box>
    </Card>
  </SignInContainer>
);
