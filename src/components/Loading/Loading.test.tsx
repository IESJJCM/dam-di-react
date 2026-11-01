import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Loading } from './Loading';

describe('Loading', () => {
  it('announces that the page is loading', () => {
    render(<Loading />);
    expect(screen.getByRole('status')).toHaveTextContent('Cargando…');
  });

  it('should match the snapshot', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
