import { GoogleOAuthProvider } from '@react-oauth/google';
import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement, type ReactNode, StrictMode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => (
  <StrictMode>
    <GoogleOAuthProvider clientId='fake-id'>{children}</GoogleOAuthProvider>
  </StrictMode>
);

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions
): ReturnType<typeof render> => render(ui, { wrapper: Providers, ...options });
