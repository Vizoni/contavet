import React, { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router';

const HomeLazy = React.lazy(() =>
  import('ui/pages/Home/Home').then(({ Home }) => ({ default: Home }))
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
            <Route path='/' element={<HomeLazy />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}
