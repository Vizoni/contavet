import App from './App';

import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { GoogleOAuthProvider } from '@react-oauth/google';

// TODO: Isso aqui tem que estar num var env (lembrar de também criar no github actions!)
export const CLIENT_ID = '937575590763-mk76i24n9p8cv1pb316q6ujo8juhhp3q.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);
