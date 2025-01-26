import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { StrictMode } from 'react';
const Providers = ({ children }) => (_jsx(StrictMode, { children: children }));
export const renderWithProviders = (ui, options) => render(ui, { wrapper: Providers, ...options });
//# sourceMappingURL=renderWithProviders.js.map