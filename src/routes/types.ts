import { Component } from 'solid-js';
import { RouteDefinition } from '@solidjs/router';

export interface AppRoute extends RouteDefinition {
  title?: string;
  icon?: Component;
  showInNav?: boolean;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
}

export type RouteConfig = AppRoute[]; 