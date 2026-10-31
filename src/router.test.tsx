import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderApp } from './test';

describe('App', () => {
  it('shows the collection title', () => {
    renderApp();
    expect(
      screen.getByRole('heading', { name: 'Nuestra Colección' })
    ).toBeInTheDocument();
  });

  it('shows one card per guitar in the catalogue', () => {
    renderApp();
    expect(screen.getAllByRole('article')).toHaveLength(12);
  });

  it('updates the document title with the number of guitars', () => {
    renderApp();
    expect(document.title).toBe('GuitarLA · 12 guitarras');
  });

  it('adds guitars to the cart and shows them in the panel', async () => {
    const user = userEvent.setup();
    renderApp();

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
    renderApp();

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

  it('navigates to the new guitar page from the header', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'Añadir guitarra' }));

    expect(
      screen.getByRole('heading', { name: 'Nueva guitarra' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Añadir guitarra' })
    ).toHaveAttribute('aria-current', 'page');
    expect(document.title).toBe('Nueva guitarra · GuitarLA');
  });

  it('shows the not found page for an unknown route', () => {
    renderApp('/no-existe');

    expect(
      screen.getByRole('heading', { name: 'Página no encontrada' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Volver al catálogo' })
    ).toHaveAttribute('href', '/');
  });

  it('shows the detail of a guitar and adds it to the cart from there', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'SRV' }));

    expect(
      await screen.findByRole('heading', { level: 1, name: 'SRV' })
    ).toBeInTheDocument();
    expect(document.title).toBe('SRV · GuitarLA');
    expect(screen.getByText('$349')).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Agregar al carrito' })
    );

    expect(screen.getByText('1 artículos en el carrito')).toBeInTheDocument();
  });

  it('shows the not found page for a guitar that does not exist', async () => {
    renderApp('/guitars/999');

    expect(
      await screen.findByRole('heading', { name: 'Página no encontrada' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('No existe ninguna guitarra con el id 999.')
    ).toBeInTheDocument();
  });
});
