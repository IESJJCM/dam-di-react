import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';
import type { CartItem } from '../../types';
import userEvent from '@testing-library/user-event';

import { Cart } from './Cart';

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

const renderCart = (cart: CartItem[] = []) => {
  const handlers = {
    onClose: vi.fn(),
    onIncrease: vi.fn(),
    onDecrease: vi.fn(),
    onRemove: vi.fn(),
    onClear: vi.fn(),
  };
  render(<Cart cart={cart} {...handlers} />);
  return handlers;
};

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
    renderCart(items);

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

  it('calls the quantity handlers with the id of the item', async () => {
    const user = userEvent.setup();
    const { onIncrease, onDecrease, onRemove } = renderCart(items);

    await user.click(
      screen.getByRole('button', { name: 'Añadir una unidad de Lukather' })
    );
    await user.click(
      screen.getByRole('button', { name: 'Quitar una unidad de Lukather' })
    );
    await user.click(
      screen.getByRole('button', { name: 'Eliminar SRV del carrito' })
    );

    expect(onIncrease).toHaveBeenCalledWith(1);
    expect(onDecrease).toHaveBeenCalledWith(1);
    expect(onRemove).toHaveBeenCalledWith(2);
  });

  it('disables the decrease button at the minimum quantity', () => {
    renderCart(items);
    expect(
      screen.getByRole('button', { name: 'Quitar una unidad de SRV' })
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Quitar una unidad de Lukather' })
    ).toBeEnabled();
  });

  it('disables the increase button at the maximum quantity', () => {
    renderCart([{ ...items[0], quantity: 5 }]);
    expect(
      screen.getByRole('button', { name: 'Añadir una unidad de Lukather' })
    ).toBeDisabled();
  });

  it('calls onClear when the clear button is clicked', async () => {
    const user = userEvent.setup();
    const { onClear } = renderCart(items);

    await user.click(screen.getByRole('button', { name: 'Vaciar carrito' }));

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
