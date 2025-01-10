import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useStore } from '@/store/zustand';

export const FullscreenPreloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const store = useStore();

  useEffect(() => {
    if (store.checkedAuth) {
      setOpacity(0);
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [store.checkedAuth]);

  return (
    <>
      {isVisible && (
        <div
          role="status"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-300 ease-in-out"
          style={{ opacity }}
        >
          <div className="h-12 w-12">
            <div className="h-full w-full rounded-full border-5 border-primary/30 border-t-primary animate-spin" />
          </div>
        </div>
      )}
      {store.checkedAuth && <Outlet />}
    </>
  );
};
