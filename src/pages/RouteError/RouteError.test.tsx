import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { RouteError } from './RouteError';
import { Layout } from '../../layouts';

describe('RouteError', () => {
  it('shows the error of a loader and a way back to the catalogue', async () => {
    const router = createMemoryRouter([
      {
        Component: Layout,
        ErrorBoundary: RouteError,
        children: [
          {
            index: true,
            loader: () => {
              throw new Error('No se ha podido cargar el catálogo');
            },
          },
        ],
      },
    ]);

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: 'Algo ha fallado' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('No se ha podido cargar el catálogo')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Volver al catálogo' })
    ).toHaveAttribute('href', '/');
  });
});
