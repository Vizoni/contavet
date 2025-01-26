import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
const LoginLazy = React.lazy(() => import('ui/pages/Login/Login').then(({ Login: Login }) => ({ default: Login })));
function ErrorBoundary({ children }) {
    try {
        return _jsx(_Fragment, { children: children });
    }
    catch (error) {
        return _jsx("div", { children: "Erro ao carregar a p\u00E1gina!" });
    }
}
export function RootRoute() {
    return (_jsx(BrowserRouter, { children: _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(ErrorBoundary, { children: _jsx(Routes, { children: _jsx(Route, { path: '/', element: _jsx(LoginLazy, {}) }) }) }) }) }));
}
//# sourceMappingURL=RootRoute.js.map