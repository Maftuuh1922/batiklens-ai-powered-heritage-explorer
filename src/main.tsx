import '@/lib/errorReporter';
import { LanguageProvider } from '@/lib/LanguageContext';
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
import { HomePage } from '@/pages/HomePage';
import { ScanPage } from '@/pages/ScanPage';
import { ResultPage } from '@/pages/ResultPage';
import { CatalogPage } from '@/pages/CatalogPage';
import { DetailPage } from '@/pages/DetailPage';
import GalleryPage from '@/pages/GalleryPage';
import { QuizPage } from '@/pages/QuizPage';
import { EnhancedDetailPage } from '@/pages/EnhancedDetailPage';
import { Museum3DPage } from '@/pages/Museum3DPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/scan", element: <ScanPage /> },
      { path: "/result", element: <ResultPage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/museum", element: <Museum3DPage /> },
      { path: "/gallery", element: <GalleryPage /> },
      { path: "/batik/:id", element: <DetailPage /> },
      { path: "/story", element: <GalleryPage /> },
      { path: "/story/:motifId", element: <EnhancedDetailPage /> },
      { path: "/quiz", element: <QuizPage /> },
      { path: "/quiz/:motifId", element: <QuizPage /> },
    ]
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
)