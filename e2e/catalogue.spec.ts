import { expect, test } from '@playwright/test';

test.describe('Catalogue', () => {
  test('loads the guitars and their images from Supabase', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('article')).toHaveCount(12);
    await expect(
      page.getByRole('img', { name: 'Guitarra Lukather' })
    ).toHaveAttribute('src', /\/storage\/v1\/object\/public\/guitars\//);
  });
});
