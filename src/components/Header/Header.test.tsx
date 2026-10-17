import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from './Header';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
  it('shows the logo linking to the home page', () => {
    render(<Header />);
    const logo = screen.getByRole('img', { name: 'Logotipo de GuitarLA' });
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('starts with the cart closed', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: 'Abrir carrito' })
    ).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('complementary', { name: 'Tu carrito' })
    ).not.toBeInTheDocument();
  });

  it('opens the cart when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

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
    render(<Header />);

    await user.click(screen.getByRole('button', { name: 'Abrir carrito' }));
    await user.keyboard('{Escape}');

    expect(
      screen.queryByRole('complementary', { name: 'Tu carrito' })
    ).not.toBeInTheDocument();
  });
});
