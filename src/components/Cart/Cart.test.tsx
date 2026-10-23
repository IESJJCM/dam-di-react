import { screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';
import type { CartItem } from '../../types';
import userEvent from '@testing-library/user-event';

import { Cart } from './Cart';
import { renderWithProviders, cartItems } from '../../test/';

const renderCart = (cart: CartItem[] = []) => {
  const onClose = vi.fn();
  renderWithProviders(<Cart onClose={onClose} />, { cart });
  return { onClose };
};

const row = (name: string) => screen.getByRole('cell', { name }).closest('tr')!;

describe('Cart', () => {
  it('shows the empty message and disables the clear button', () => {
    renderCart();

    expect(screen.getByText('El carrito está vacío')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Vaciar carrito' })
    ).toBeDisabled();
  });

  it('shows one row per item and the total', () => {
    renderCart(cartItems);

    expect(screen.getByRole('cell', { name: 'Lukather' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'SRV' })).toBeInTheDocument();
    expect(screen.getByText('$947')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Vaciar carrito' })
    ).toBeEnabled();
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const { onClose } = renderCart();

    await user.click(screen.getByRole('button', { name: 'Cerrar carrito' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('changes the quantity of a line and the total', async () => {
    const user = userEvent.setup();
    renderCart(cartItems);

    await user.click(
      screen.getByRole('button', { name: 'Añadir una unidad de Lukather' })
    );
    expect(row('Lukather')).toHaveTextContent('3');
    expect(screen.getByText('$1246')).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Quitar una unidad de Lukather' })
    );
    expect(row('Lukather')).toHaveTextContent('2');
    expect(screen.getByText('$947')).toBeInTheDocument();
  });

  it('disables the increase button at the maximum quantity', () => {
    renderCart([{ ...cartItems[0], quantity: 5 }]);
    expect(
      screen.getByRole('button', { name: 'Añadir una unidad de Lukather' })
    ).toBeDisabled();
  });

  it('removes a line', async () => {
    const user = userEvent.setup();
    renderCart(cartItems);

    await user.click(
      screen.getByRole('button', { name: 'Eliminar SRV del carrito' })
    );

    expect(screen.queryByRole('cell', { name: 'SRV' })).not.toBeInTheDocument();
    expect(screen.getByText('$598')).toBeInTheDocument();
  });

  it('clears the cart', async () => {
    const user = userEvent.setup();
    renderCart(cartItems);

    await user.click(screen.getByRole('button', { name: 'Vaciar carrito' }));

    expect(screen.getByText('El carrito está vacío')).toBeInTheDocument();
  });
});
