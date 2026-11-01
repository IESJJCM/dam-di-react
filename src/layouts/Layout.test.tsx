import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, Link, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Layout } from './Layout';

describe('Layout', () => {
  it('marks the main region as busy while the next page loads', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter([
      {
        Component: Layout,
        children: [
          {
            index: true,
            element: <Link to="/slow">Ir a la página lenta</Link>,
          },
          {
            path: 'slow',
            // A loader that never resolves keeps the navigation in "loading".
            loader: () => new Promise(() => {}),
            element: <p>Nunca se pinta</p>,
          },
        ],
      },
    ]);
    render(<RouterProvider router={router} />);

    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('aria-busy', 'false');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('link', { name: 'Ir a la página lenta' })
    );

    expect(main).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Cargando…');
    expect(
      screen.getByRole('link', { name: 'Ir a la página lenta' })
    ).toBeInTheDocument();
  });
});
