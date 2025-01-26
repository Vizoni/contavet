import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement, type ReactNode, StrictMode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => (
  <StrictMode>
    {/* <MyProvider {...props}>{children}</Myprovider>*/}
    {children}
  </StrictMode>
);

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions
): ReturnType<typeof render> => render(ui, { wrapper: Providers, ...options });
