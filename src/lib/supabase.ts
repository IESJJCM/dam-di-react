import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    'Faltan VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY: copia .env.example a .env y rellénalo.'
  );
}

/** The Supabase client of the app. Every query goes through it. */
export const supabase = createClient(url, key);
