import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Route } from 'react-router-dom';
const HomeLazy = React.lazy(() => import('ui/pages/Home/Home').then(({ Home }) => ({ default: Home })));
export function RootRoute() {
    return (_jsx(_Fragment, { children: _jsx(Route, { path: '/', Component: HomeLazy }) }));
}
//# sourceMappingURL=RootRoute.js.map