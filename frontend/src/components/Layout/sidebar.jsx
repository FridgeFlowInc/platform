import { ShoppingCart, ChartPie, ShoppingBasket } from 'lucide-react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

import { NavHeader } from '@/components/Layout/nav-header';
import { NavMain } from '@/components/Layout/nav-main';
import { NavUser } from '@/components/Layout/nav-user';

const data = {
  user: {
    name: 'Admin',
    email: 'admin@mail.com',
  },
  navMain: [
    {
      title: 'Продукты',
      url: '/',
      icon: ShoppingBasket,
      isActive: true,
    },
    {
      title: 'Аналитика',
      url: '/analytics',
      icon: ChartPie,
    },
    {
      title: 'Корзина',
      url: '/shopping_cart',
      icon: ShoppingCart,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
