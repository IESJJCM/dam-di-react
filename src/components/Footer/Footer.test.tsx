import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  /** 
  it.skip('renders options', () => {
    // Container no se actualiza con las iteraciones por eso es mejor screen
    const { container } = render(<Footer />);
    // screen.debug();
    // console.log(container.innerHTML);
    const h1 = container.querySelector('footer');
    console.log(h1?.textContent);
    expect(h1?.textContent).toBe('GuitarLA - Todos los derechos reservados');
  });
  */

  it('should match the snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it.skip('shows the copyright notice', () => {
    render(<Footer />);
    expect(
      screen.getByText('GuitarLA - Todos los derechos reservados')
    ).toBeInTheDocument();
  });
});
