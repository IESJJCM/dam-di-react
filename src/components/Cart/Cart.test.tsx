import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Cart } from './Cart';

describe('Cart', () => {
  it('shows the title and the close button', () => {
    render(<Cart />);
    expect(
      screen.getByRole('heading', { name: 'Tu carrito' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cerrar carrito' })
    ).toBeInTheDocument();
  });

  it('shows the total and the clear button', () => {
    render(<Cart />);
    expect(screen.getByText('Total pagar:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Vaciar carrito' })
    ).toBeInTheDocument();
  });
});
