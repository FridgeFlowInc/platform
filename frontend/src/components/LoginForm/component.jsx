import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Refrigerator, Loader } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { checkAuth } from '@/api/v1/checkAuth';

import { useStore } from '@/store/zustand';

import { delay } from '@/lib/delay';

const LoginFormProps = {
  className: PropTypes.string,
};

export function LoginForm({ className, ...props }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const store = useStore();

  useEffect(() => {
    if (store.isAuthenticated) {
      navigateRef.current('/');
    }
  }, [store.isAuthenticated, store.checkedAuth]);

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    await delay(500);

    const result = await checkAuth(data.password);

    if (result.success) {
      toast.success('Успешный вход');

      await delay(250);
      store.login(data.password);

      navigate('/');
      setLoading(false);
    } else {
      toast.error('Ошибка входа', {
        description: result.message,
      });
      setLoading(false);
    }
  };

  return (
    <div className={cn('relative flex flex-col gap-6', className)} {...props}>
      <form onSubmit={submitForm}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <Refrigerator className="size-6" />
              </div>
              <span className="sr-only">FridgeFlow Inc.</span>
            </Link>
            <h1 className="text-xl font-bold">FridgeFlow</h1>
            <div className="text-center text-sm">Введите пароль выданный вашим организатором</div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" name="password" type="password" placeholder="*****" required />
            </div>
            {loading ? (
              <Button disabled>
                <Loader className="animate-spin" />
                Загрузка
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Войти
              </Button>
            )}
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-zinc-500 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-zinc-900 dark:text-zinc-400 dark:hover:[&_a]:text-zinc-50">
        &copy; FridgeFlow Inc.
      </div>
    </div>
  );
}

LoginForm.propTypes = LoginFormProps;
