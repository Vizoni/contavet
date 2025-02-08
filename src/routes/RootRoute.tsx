import React, { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router';

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
          </Routes>
          <Routes>
            <Route path='/home2' element={<HomeLazy />} />
          </Routes>
          <Routes>
            <Route path='/home' element={<GoogleLoginLazy />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}
