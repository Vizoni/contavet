import React, { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router';
// import { PrivateRoute } from './PrivateRoute';

const LoginLazy = React.lazy(() =>
  import('ui/pages/Login/Login').then(({ Login: Login }) => ({ default: Login }))
);
const GoogleLoginLazy = React.lazy(() =>
  import('ui/pages/Login/GoogleLandingPageTemporary').then(
    ({ GoogleLandingPageTemporary: GoogleLandingPageTemporary }) => ({
      default: GoogleLandingPageTemporary,
    })
  )
);
const HomeLazy = React.lazy(() =>
  import('ui/pages/Home/Home').then(({ Home: Home }) => ({ default: Home }))
);

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (error) {
    return <div>Erro ao carregar a página!</div>;
  }
}

export function RootRoute() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<LoginLazy />} />
            <Route path='/home' element={<GoogleLoginLazy />} />
            <Route path='/home2' element={<HomeLazy />} />
            {/* <Route
              path='/home2'
              element={
                <PrivateRoute>
                  <HomeLazy />
                </PrivateRoute>
              }
            /> */}
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}
