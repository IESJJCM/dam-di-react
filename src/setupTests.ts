import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Every test talks to the fake catalogue in src/api/guitars/__mocks__, not to Supabase.
vi.mock('./api/guitars/guitars');

afterEach(() => {
  cleanup();
  localStorage.clear();
});
