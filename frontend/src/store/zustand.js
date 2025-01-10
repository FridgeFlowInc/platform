import Cookies from 'js-cookie';
import { create } from 'zustand';

import { checkAuth } from '@/api/v1/checkAuth';

const tokenCookieName = 'fridgeflow:password';

export const getTokenfromCookie = (cookieName) => {
  return Cookies.get(cookieName) || null;
};

export const setTokenToCookie = (cookieName, token) => {
  if (!token) return;
  Cookies.set(cookieName, token, { expires: 30, SameSite: 'Lax' });
};

export const unsetTokenfromCookie = (cookieName) => {
  Cookies.remove(cookieName);
};

export const useStore = create((set) => ({
  isAuthenticated: false,
  checkedAuth: false,
  token: null,
  login: (token) => {
    set({ isAuthenticated: true, checkedAuth: true, token: token });
    setTokenToCookie(tokenCookieName, token);
  },
  logout: () => {
    set({ isAuthenticated: false, token: null, user: null, checkedAuth: true });
    unsetTokenfromCookie(tokenCookieName);
  },
  checkAuth: async () => {
    const token = getTokenfromCookie(tokenCookieName);

    if (token) {
      const result = await checkAuth(token);

      if (result.success) {
        set({
          isAuthenticated: true,
          checkedAuth: true,
          token: token,
        });
      } else {
        set({ isAuthenticated: false, checkedAuth: true, token: null });
      }
    } else {
      set({ isAuthenticated: false, checkedAuth: true, token: null });
    }
  },
}));
