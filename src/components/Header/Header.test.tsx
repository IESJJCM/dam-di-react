import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('shows the logo linking to the home page', () => {
    render(<Header />);
    const logo = screen.getByRole('img', { name: 'Logotipo de GuitarLA' });
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('shows the button to open the cart', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: 'Abrir carrito' })
    ).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
