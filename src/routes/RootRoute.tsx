import React, { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router';

const LoginLazy = React.lazy(() =>
  import('ui/pages/Login/Login').then(({ Login: Login }) => ({ default: Login }))
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
            <Route path='/home' element={<HomeLazy />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}
