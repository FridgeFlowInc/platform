import { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import { useStore } from '@/store/zustand';

export const PrivateRoute = () => {
  const store = useStore();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  useEffect(() => {
    if (!store.isAuthenticated && store.checkedAuth) {
      toast.warning('Авторизуйтесь');
      navigateRef.current('/login');
    }
  }, [store.isAuthenticated, store.checkedAuth]);

  return <Outlet />;
};
