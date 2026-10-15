import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Guitar } from './Guitar';

describe('Guitar', () => {
  it('shows the guitar name, image and price', () => {
    render(<Guitar />);
    expect(
      screen.getByRole('heading', { name: 'Lukather' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Guitarra Lukather' })
    ).toBeInTheDocument();
    expect(screen.getByText('$299')).toBeInTheDocument();
  });

  it('shows the add to cart button', () => {
    render(<Guitar />);
    expect(
      screen.getByRole('button', { name: 'Agregar al carrito' })
    ).toBeInTheDocument();
  });
});
