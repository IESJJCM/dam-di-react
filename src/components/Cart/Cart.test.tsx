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

describe('Cart', () => {
  it('shows the empty message and disables the clear button', () => {
    render(<Cart cart={[]} onClose={vi.fn()} />);

    expect(screen.getByText('El carrito está vacío')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Vaciar carrito' })
    ).toBeDisabled();
  });

  it('shows one row per item and the total', () => {
    render(<Cart cart={items} onClose={vi.fn()} />);

    expect(screen.getByRole('cell', { name: 'Lukather' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'SRV' })).toBeInTheDocument();
    expect(screen.getByText('$947')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Vaciar carrito' })
    ).toBeEnabled();
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Cart cart={[]} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: 'Cerrar carrito' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
