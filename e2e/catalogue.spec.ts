import { expect, test } from '@playwright/test';

test.describe('Catalogue', () => {
  test('loads the guitars and their images from Supabase', async ({ page }) => {
    await page.goto('/');

    // At least the twelve of the seed: the new guitar test adds more.
    await expect
      .poll(() => page.getByRole('article').count())
      .toBeGreaterThanOrEqual(12);
    await expect(
      page.getByRole('img', { name: 'Guitarra Lukather' })
    ).toHaveAttribute('src', /\/storage\/v1\/object\/public\/guitars\//);
  });
});
