# GuitarLA

## Getting started

The catalogue lives in a [Supabase](https://supabase.com) project. To run the app:

1. Create a Supabase project and run `supabase/schema.sql` and then `supabase/seed.sql` in its SQL Editor.
2. Upload the images of `public/img/guitarra_*.jpg` to the `guitars` bucket.
3. Copy `.env.example` to `.env` and fill it with the URL and the publishable key of the project (Project Settings → API Keys).
4. `npm install` and `npm run dev`.

Tests and Storybook do not need Supabase: they use the fake catalogue in `src/api/guitars/__mocks__`.
