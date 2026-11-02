import { createBrowserRouter, type RouteObject } from 'react-router';

import { Layout } from './layouts';
import { Loading } from './components';
import { GuitarDetail, Home, NewGuitar, NotFound, RouteError } from './pages';
import { createGuitarAction, guitarLoader, guitarsLoader } from './loaders';

/** The routes of GuitarLA: a layout with the header and footer, and its pages. */
export const routes: RouteObject[] = [
  {
    Component: Layout,
    ErrorBoundary: RouteError,
    children: [
      {
        index: true,
        Component: Home,
        loader: guitarsLoader,
        HydrateFallback: Loading,
      },
      {
        path: 'guitars/new',
        Component: NewGuitar,
        action: createGuitarAction,
      },
      {
        path: 'guitars/:id',
        Component: GuitarDetail,
        loader: guitarLoader,
        HydrateFallback: Loading,
      },
      { path: '*', Component: NotFound },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
