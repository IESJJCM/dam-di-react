import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { CartItem } from '../../types';
import { Header } from './Header';

const items: CartItem[] = [
  {
    id: 1,
    name: 'Lukather',
    image: 'guitarra_01',
    description: 'Una guitarra de prueba',
    price: 299,
    quantity: 2,
  },
  {
    id: 2,
    name: 'SRV',
    image: 'guitarra_02',
    description: 'Otra guitarra de prueba',
    price: 349,
    quantity: 1,
  },
];

const renderHeader = (cart: CartItem[] = []) =>
  render(
    <Header
      cart={cart}
      onIncrease={vi.fn()}
      onDecrease={vi.fn()}
      onRemove={vi.fn()}
      onClear={vi.fn()}
    />
  );

describe('Header', () => {
  it('shows the logo linking to the home page', () => {
    renderHeader();
    const logo = screen.getByRole('img', { name: 'Logotipo de GuitarLA' });
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('starts with the cart closed', () => {
    renderHeader();
    expect(
      screen.getByRole('button', { name: 'Abrir carrito' })
    ).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('complementary', { name: 'Tu carrito' })
    ).not.toBeInTheDocument();
  });

  it('opens the cart when the button is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'Abrir carrito' }));

    expect(
      screen.getByRole('complementary', { name: 'Tu carrito' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Abrir carrito' })
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the cart with the Escape key', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'Abrir carrito' }));
    await user.keyboard('{Escape}');

    expect(
      screen.queryByRole('complementary', { name: 'Tu carrito' })
    ).not.toBeInTheDocument();
  });

  it('shows the number of items in the cart', () => {
    renderHeader(items);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('3 artículos en el carrito')).toBeInTheDocument();
  });
});
