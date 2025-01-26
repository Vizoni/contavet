import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
const HomeLazy = React.lazy(() => import('ui/pages/Home/Home').then(({ Home }) => ({ default: Home })));
function ErrorBoundary({ children }) {
    try {
        return _jsx(_Fragment, { children: children });
    }
    catch (error) {
        console.error('Erro ao carregar componente:', error);
        return _jsx("div", { children: "Erro ao carregar a p\u00E1gina" });
    }
}
export function RootRoute() {
    console.info('RootRoute renderiozu');
    return (_jsx(BrowserRouter, { children: _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(ErrorBoundary, { children: _jsx(Routes, { children: _jsx(Route, { path: "/", element: _jsx(HomeLazy, {}) }) }) }) }) }));
}
//# sourceMappingURL=RootRoute.js.map