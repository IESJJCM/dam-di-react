import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('shows the collection title', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'Nuestra Colección' })
    ).toBeInTheDocument();
  });

  it('shows one card per guitar in the catalogue', () => {
    render(<App />);
    expect(screen.getAllByRole('article')).toHaveLength(12);
  });

  it('updates the document title with the number of guitars', () => {
    render(<App />);
    expect(document.title).toBe('GuitarLA · 12 guitarras');
  });

  it('adds guitars to the cart and shows them in the panel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: 'Agregar al carrito Lukather' })
    );
    await user.click(
      screen.getByRole('button', { name: 'Agregar al carrito Lukather' })
    );
    await user.click(
      screen.getByRole('button', { name: 'Agregar al carrito SRV' })
    );
    await user.click(screen.getByRole('button', { name: 'Abrir carrito' }));

    const cart = screen.getByRole('complementary', { name: 'Tu carrito' });
    expect(within(cart).getAllByRole('row')).toHaveLength(3);
    expect(within(cart).getByText('$947')).toBeInTheDocument();
    expect(screen.getByText('3 artículos en el carrito')).toBeInTheDocument();
  });

  it('changes quantities, removes items and clears the cart from the panel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: 'Agregar al carrito Lukather' })
    );
    await user.click(
      screen.getByRole('button', { name: 'Agregar al carrito SRV' })
    );
    await user.click(screen.getByRole('button', { name: 'Abrir carrito' }));
    const cart = screen.getByRole('complementary', { name: 'Tu carrito' });

    await user.click(
      within(cart).getByRole('button', {
        name: 'Añadir una unidad de Lukather',
      })
    );
    expect(within(cart).getByText('$947')).toBeInTheDocument();

    await user.click(
      within(cart).getByRole('button', { name: 'Eliminar SRV del carrito' })
    );
    expect(within(cart).getByText('$598')).toBeInTheDocument();

    await user.click(
      within(cart).getByRole('button', { name: 'Vaciar carrito' })
    );
    expect(within(cart).getByText('El carrito está vacío')).toBeInTheDocument();
    expect(screen.getByText('0 artículos en el carrito')).toBeInTheDocument();
  });
});
