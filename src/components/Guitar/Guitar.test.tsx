import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Guitar as GuitarType } from '../../types';
import { Guitar } from './Guitar';

const guitar: GuitarType = {
  id: 1,
  name: 'Lukather',
  image: 'guitarra_01',
  description: 'Una guitarra de prueba',
  price: 299,
};

describe('Guitar', () => {
  it('shows the name, image, description and price of the guitar', () => {
    render(<Guitar guitar={guitar} />);

    expect(
      screen.getByRole('heading', { name: 'Lukather' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('img', { name: 'Guitarra Lukather' })
    ).toHaveAttribute('src', '/img/guitarra_01.jpg');

    expect(screen.getByText('Una guitarra de prueba')).toBeInTheDocument();

    expect(screen.getByText('$299')).toBeInTheDocument();
  });
});
