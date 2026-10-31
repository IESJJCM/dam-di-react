import { createBrowserRouter, type RouteObject } from 'react-router';
import { Layout } from './layouts';
import { Home, NewGuitar, NotFound, RouteError } from './pages';

/** The routes of GuitarLA: a layout with the header and footer, and its pages. */
export const routes: RouteObject[] = [
  {
    Component: Layout,
    ErrorBoundary: RouteError,
    children: [
      { index: true, Component: Home },
      { path: 'guitars/new', Component: NewGuitar },
      { path: '*', Component: NotFound },
    ],
  },
];

export const router = createBrowserRouter(routes);
