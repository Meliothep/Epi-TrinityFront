import { lazy } from 'solid-js';
import { AppRoute } from '../types';

export const publicRoutes: AppRoute[] = [
  {
    path: '/',
    component: lazy(() => import('../../pages/Home')),
    title: 'Home',
    showInNav: true,
  },
  {
    path: '/products',
    component: lazy(() => import('../../pages/Products')),
    title: 'Products',
    showInNav: true,
  },
  {
    path: '/categories',
    component: lazy(() => import('../../pages/Categories')),
    title: 'Categories',
    showInNav: true,
  },
  {
    path: '/products/:id',
    component: lazy(() => import('../../pages/ProductDetail')),
  },
  {
    path: '/login',
    component: lazy(() => import('../../pages/Login')),
  },
  {
    path: '/register',
    component: lazy(() => import('../../pages/Register')),
  },
  {
    path: '*',
    component: lazy(() => import('../../pages/NotFound')),
  },
]; 