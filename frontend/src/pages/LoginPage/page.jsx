import { LoginForm } from '@/components/LoginForm';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white p-6 md:p-10 dark:bg-zinc-950">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
