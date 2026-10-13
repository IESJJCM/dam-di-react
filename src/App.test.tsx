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
});
