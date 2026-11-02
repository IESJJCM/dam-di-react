# GuitarLA

A small guitar shop built with React to learn how a front-end application is
made: components, state, a cart that survives reloads, routes, a catalogue
served by Supabase and a form that uploads images. It is the project of the
React unit of the **Desarrollo de Interfaces** module.

- **Live app**: https://guitarla-<your-name>.netlify.app
- **Storybook**: https://guitarla-<your-name>-storybook.netlify.app
- **API docs** (TypeDoc): https://guitarla-<your-name>-docs.netlify.app

## Stack

| Area          | Tools                                                            |
| ------------- | ---------------------------------------------------------------- |
| UI            | React 19, TypeScript, Tailwind CSS 4, React Router 8 (data mode) |
| Backend       | Supabase (Postgres, Storage) through `@supabase/supabase-js`     |
| Tooling       | Vite 8, ESLint, Prettier                                         |
| Tests         | Vitest + Testing Library (unit), Playwright + axe (end to end)   |
| Documentation | Storybook 10 (components), TypeDoc (API), this README            |

## Getting started

The catalogue lives in a [Supabase](https://supabase.com) project. To run the app:

1. Create a Supabase project and run `supabase/schema.sql`, `supabase/seed.sql`
   and `supabase/insert-policies.sql` in its SQL Editor.
2. Upload the images of `public/img/guitarra_*.jpg` to the `guitars` bucket.
3. Copy `.env.example` to `.env` and fill it with the URL and the publishable
   key of the project (Project Settings → API Keys).
4. `npm install` and `npm run dev`.

Tests and Storybook do not need Supabase: they use the fake catalogue in
`src/api/guitars/__mocks__`. The end-to-end tests do: they run against the
project of your `.env`, and every run of the new guitar test adds a guitar.

## Scripts

| Script                    | What it does                                        |
| ------------------------- | --------------------------------------------------- |
| `npm run dev`             | Development server on http://localhost:5173         |
| `npm run build`           | Type-checks and builds the app into `dist/`         |
| `npm run preview`         | Serves `dist/` to check the production build        |
| `npm run lint`            | ESLint                                              |
| `npm run format`          | Prettier, writing the changes                       |
| `npm run format:check`    | Prettier, failing if something is not formatted     |
| `npm test`                | Vitest in watch mode (`npx vitest run` for one run) |
| `npm run test:e2e`        | Playwright (`test:e2e:ui` opens its UI)             |
| `npm run storybook`       | Storybook on http://localhost:6006                  |
| `npm run build-storybook` | Static Storybook into `storybook-static/`           |
| `npm run docs:api`        | TypeDoc into `docs/api/`                            |

## Project structure

```text
src/
  api/          one folder per resource; the only code that talks to Supabase
    guitars/    getGuitars, getGuitar, createGuitar and their __mocks__
  components/   one folder per component: X.tsx, X.test.tsx, X.stories.tsx, index.ts
  context/      CartContext and CartProvider
  hooks/        useCart, useDocumentTitle
  layouts/      Layout: header, main with the Outlet, footer
  lib/          the Supabase client
  loaders/      loaders and actions of the routes, grouped by entity
  pages/        one folder per route
  test/         fixtures and helpers for the tests
  types/        Guitar, CartItem, NewGuitar…
  utils/        pure functions such as validateNewGuitar
  router.tsx    the routes
e2e/            Playwright tests
supabase/       SQL to create the table, the bucket, the data and the policies
```

## Conventions

- One branch per feature (`feat/<name>`), merged into `main` with `--no-ff`
  and tagged (`v0.3.0` … `v1.0.0`) with a GitHub release.
- No commit leaves the app broken: `tsc`, ESLint, Prettier and Vitest pass on
  every commit; CI runs them on every push and pull request.
- Every component has a test and a story; every route with data has a loader
  or an action; everything that talks to Supabase lives in `src/api/`.
- Accessibility is part of the definition of done: accessible names, live
  regions, linked errors and focus management, checked with axe in Storybook
  and in Playwright.

## Deployment

The app is a static site: `npm run build` produces `dist/`, which any static
host can serve. Two things to configure in the host:

- the environment variables `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_PUBLISHABLE_KEY`, read at build time;
- a fallback from every path to `index.html`, so that `/guitars/3` opened
  directly reaches the React Router (`public/_redirects` does it on Netlify).
