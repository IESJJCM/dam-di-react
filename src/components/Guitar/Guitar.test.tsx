import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '../../test';

import { guitars } from '../../test/fixtures';
import { Guitar } from './Guitar';

const guitar = guitars[0];

describe('Guitar', () => {
  it('shows the name, image, description and price of the guitar', () => {
    renderWithProviders(<Guitar guitar={guitar} onAddToCart={vi.fn()} />);

    expect(
      screen.getByRole('heading', { name: 'Lukather' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Lukather' })).toHaveAttribute(
      'href',
      '/guitars/1'
    );
    expect(
      screen.getByRole('img', { name: 'Guitarra Lukather' })
    ).toHaveAttribute('src', 'img/guitarra_01.jpg');

    expect(screen.getByText('Una guitarra de prueba')).toBeInTheDocument();

    expect(screen.getByText('$299')).toBeInTheDocument();
  });

  it('calls onAddToCart with the guitar when the button is clicked', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();
    renderWithProviders(<Guitar guitar={guitar} onAddToCart={onAddToCart} />);

    await user.click(
      screen.getByRole('button', { name: 'Agregar al carrito Lukather' })
    );

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(guitar);
  });
});
