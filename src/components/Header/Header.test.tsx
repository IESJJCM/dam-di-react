import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { CartItem } from '../../types';
import { Header } from './Header';

import { cartItems, renderWithProviders } from '../../test';

const renderHeader = (cart: CartItem[] = []) =>
  renderWithProviders(<Header />, { cart });

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
    renderHeader(cartItems);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('3 artículos en el carrito')).toBeInTheDocument();
  });
});
