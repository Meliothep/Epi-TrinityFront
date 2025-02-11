import { lazy } from 'solid-js';
import { AppRoute } from '../types';

export const protectedRoutes: AppRoute[] = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../pages/Dashboard')),
    title: 'Dashboard',
    showInNav: true,
    requiresAuth: true,
  },
  {
    path: '/profile',
    component: lazy(() => import('../../pages/Profile')),
    title: 'Profile',
    showInNav: true,
    requiresAuth: true,
  },
  {
    path: '/orders',
    component: lazy(() => import('../../pages/OrderHistory')),
    title: 'Orders',
    showInNav: true,
    requiresAuth: true,
  },
  {
    path: '/checkout',
    component: lazy(() => import('../../pages/Checkout')),
    requiresAuth: true,
  },
]; 