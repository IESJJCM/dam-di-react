import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('shows the collection title', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'Nuestra Colección' })
    ).toBeInTheDocument();
  });

  it('shows one card per guitar in the catalogue', () => {
    render(<App />);
    expect(screen.getAllByRole('article')).toHaveLength(12);
  });

  it('updates the document title with the number of guitars', () => {
    render(<App />);
    expect(document.title).toBe('GuitarLA · 12 guitarras');
  });
});
