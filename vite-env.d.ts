/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL of the Supabase project, e.g. `https://xyzcompany.supabase.co`. */
  readonly VITE_SUPABASE_URL: string;
  /** Publishable key of the project; it is safe to ship it to the browser. */
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
}
