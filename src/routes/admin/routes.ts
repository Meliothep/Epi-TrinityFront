import { lazy } from 'solid-js';
import { AppRoute } from '../types';

export const adminRoutes: AppRoute[] = [
  {
    path: '/admin',
    component: lazy(() => import('../../pages/admin/Dashboard')),
    title: 'Admin Dashboard',
    showInNav: true,
    requiresAuth: true,
    requiresAdmin: true,
  },
  {
    path: '/admin/users',
    component: lazy(() => import('../../pages/admin/Users')),
    title: 'Users',
    showInNav: true,
    requiresAuth: true,
    requiresAdmin: true,
  },
  {
    path: '/admin/products',
    component: lazy(() => import('../../pages/admin/Products')),
    title: 'Products',
    showInNav: true,
    requiresAuth: true,
    requiresAdmin: true,
  },
  {
    path: '/admin/orders',
    component: lazy(() => import('../../pages/admin/Orders')),
    title: 'Orders',
    showInNav: true,
    requiresAuth: true,
    requiresAdmin: true,
  },
  {
    path: '/admin/settings',
    component: lazy(() => import('../../pages/admin/Settings')),
    title: 'Settings',
    showInNav: true,
    requiresAuth: true,
    requiresAdmin: true,
  },
]; 