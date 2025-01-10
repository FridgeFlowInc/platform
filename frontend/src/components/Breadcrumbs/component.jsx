import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const Breadcrumbs = () => {
  const navigate = useNavigate();

  const routes = [
    { path: '/', breadcrumb: 'Продукты' },
    { path: '/analytics', breadcrumb: 'Аналитика' },
    { path: '/shopping_cart', breadcrumb: 'Корзина' },
  ];
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map(({ match, breadcrumb }, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return isLast ? (
            <BreadcrumbItem key={index}>
              <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <React.Fragment key={index}>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#" onClick={() => navigate(match.pathname)}>
                  {breadcrumb}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
