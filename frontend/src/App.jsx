import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toaster as SonnerToaster } from '@/components/ui/sonner';

import { ThemeProvider } from '@/components/ThemeProvider';
import { FullscreenPreloader } from '@/components/FullscreenPreloader';
import { Layout } from '@/components/Layout';
import { PrivateRoute } from '@/components/PrivateRoute';

import { HomePage } from '@/pages/HomePage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

import { useStore } from '@/store/zustand';

import { delay } from '@/lib/delay';

function App() {
  const store = useStore();

  useEffect(() => {
    const performCheckAuth = async () => {
      await delay(300);
      await store.checkAuth();
    };

    performCheckAuth();
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="fridgeflow-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<FullscreenPreloader />}>
            <Route element={<Layout />}>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
              </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <SonnerToaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
