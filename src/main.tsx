import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import App from './App';
import { LandingPage } from '@/pages/LandingPage';
import { ScanPage } from '@/pages/ScanPage';
import { ResultPage } from '@/pages/ResultPage';
import { CatalogPage } from '@/pages/CatalogPage';
import { DetailPage } from '@/pages/DetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/scan", element: <ScanPage /> },
      { path: "/result", element: <ResultPage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/batik/:id", element: <DetailPage /> },
    ]
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)