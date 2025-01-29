import App from './App';

import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Analytics } from '@vercel/analytics/react';

import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_AUTH_CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
console.info('Google Auth Client ID (MAIN)', import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID);
console.info('Google Auth Client ID (MAIN) (VARIAVEL FINAL)', GOOGLE_AUTH_CLIENT_ID);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
    <Analytics />
    <App />
  </GoogleOAuthProvider>
);
