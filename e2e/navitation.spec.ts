import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('goes to the new guitar page from the header and back', async ({
    page,
  }) => {
    await page.goto('/');

    const link = page.getByRole('link', { name: 'Añadir guitarra' });
    await link.click();

    await expect(page).toHaveURL('/guitars/new');
    await expect(page).toHaveTitle('Nueva guitarra · GuitarLA');
    await expect(
      page.getByRole('heading', { name: 'Nueva guitarra' })
    ).toBeVisible();
    await expect(link).toHaveAttribute('aria-current', 'page');

    await page.getByRole('link', { name: 'Logotipo de GuitarLA' }).click();
    await expect(page).toHaveURL('/');
    await expect(
      page.getByRole('heading', { name: 'Nuestra Colección' })
    ).toBeVisible();
  });

  test('opens a page directly from its URL and keeps the cart', async ({
    page,
  }) => {
    await page.goto('/');
    await page
      .getByRole('button', { name: 'Agregar al carrito Lukather' })
      .click();

    await page.goto('/guitars/new');

    await expect(
      page.getByRole('heading', { name: 'Nueva guitarra' })
    ).toBeVisible();
    await expect(page.getByText('1 artículos en el carrito')).toBeAttached();
  });

  test('shows the not found page for an unknown URL', async ({ page }) => {
    await page.goto('/esta-pagina-no-existe');

    await expect(
      page.getByRole('heading', { name: 'Página no encontrada' })
    ).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);

    await page.getByRole('link', { name: 'Volver al catálogo' }).click();
    await expect(page).toHaveURL('/');
  });

  test('opens the detail of a guitar from its card', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Borland' }).click();

    await expect(page).toHaveURL('/guitars/3');
    await expect(page).toHaveTitle('Borland · GuitarLA');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Borland' })
    ).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);

    await page.getByRole('button', { name: 'Agregar al carrito' }).click();
    await expect(page.getByText('1 artículos en el carrito')).toBeAttached();
  });

  test('shows the not found page for a guitar that does not exist', async ({
    page,
  }) => {
    await page.goto('/guitars/999');

    await expect(
      page.getByRole('heading', { name: 'Página no encontrada' })
    ).toBeVisible();
    await expect(
      page.getByText('No existe ninguna guitarra con el id 999.')
    ).toBeVisible();
  });
});
