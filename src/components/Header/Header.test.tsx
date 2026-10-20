import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
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

describe('Header', () => {
  it('shows the logo linking to the home page', () => {
    render(<Header cart={[]} />);
    const logo = screen.getByRole('img', { name: 'Logotipo de GuitarLA' });
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('starts with the cart closed', () => {
    render(<Header cart={[]} />);
    expect(
      screen.getByRole('button', { name: 'Abrir carrito' })
    ).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('complementary', { name: 'Tu carrito' })
    ).not.toBeInTheDocument();
  });

  it('opens the cart when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header cart={[]} />);

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
    render(<Header cart={[]} />);

    await user.click(screen.getByRole('button', { name: 'Abrir carrito' }));
    await user.keyboard('{Escape}');

    expect(
      screen.queryByRole('complementary', { name: 'Tu carrito' })
    ).not.toBeInTheDocument();
  });

  it('shows the number of items in the cart', () => {
    render(<Header cart={items} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('3 artículos en el carrito')).toBeInTheDocument();
  });
});
