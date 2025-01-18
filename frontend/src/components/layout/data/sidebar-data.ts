import {
  IconFridge,
  IconLockAccess,
  IconShoppingBag,
  IconBrandGoogleAnalytics,
  IconShoppingCartFilled,
} from '@tabler/icons-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'admin',
    email: 'admin@mail.com',
    avatar: '',
  },
  teams: [
    {
      name: 'FridgeFlow',
      logo: IconFridge,
      plan: '',
    },
  ],
  navGroups: [
    {
      title: 'Главное',
      items: [
        {
          title: 'Продукты',
          url: '/',
          icon: IconShoppingCartFilled,
        },
        {
          title: 'Аналитика',
          url: '/analytics',
          icon: IconBrandGoogleAnalytics,
        },
        {
          title: 'Корзина',
          url: '/shopping_cart',
          icon: IconShoppingBag,
        },
      ],
    },
    {
      title: 'Организация',
      items: [
        {
          title: 'Настройки',
          icon: IconLockAccess,
          items: [
            {
              title: 'Пользователи',
              url: '/users',
            },
          ],
        },
      ],
    },
  ],
}
