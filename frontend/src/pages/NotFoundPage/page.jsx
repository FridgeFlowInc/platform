import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-white p-6 md:p-10 dark:bg-zinc-950">
        <div className="text-center">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="mt-4 text-xl">Страница не найдена</p>
          <Button variant="secondary" size="lg" className="mt-6 px-8 py-3" onClick={() => navigate('/')}>
            На главную
          </Button>
        </div>
      </div>
    </>
  );
}
