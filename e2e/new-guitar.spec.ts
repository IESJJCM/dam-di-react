import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('New guitar', () => {
  test('shows accessible errors when the form is empty', async ({ page }) => {
    await page.goto('/guitars/new');
    await page.getByRole('button', { name: 'Guardar guitarra' }).click();

    const name = page.getByLabel('Nombre');
    await expect(name).toBeFocused();
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await expect(name).toHaveAccessibleDescription(
      'Escribe el nombre de la guitarra.'
    );

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('creates a guitar with its image and shows it in the catalogue', async ({
    page,
  }) => {
    const name = `Playwright ${Date.now()}`;

    await page.goto('/guitars/new');
    await page.getByLabel('Nombre').fill(name);
    await page
      .getByLabel('Descripción')
      .fill('Creada por un test de extremo a extremo.');
    await page.getByLabel('Precio (dólares)').fill('499');
    await page.getByLabel('Imagen').setInputFiles('public/img/guitarra_05.jpg');
    await expect(
      page.getByRole('img', { name: 'Vista previa de la imagen elegida' })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Guardar guitarra' }).click();

    await expect(page).toHaveURL(/\/guitars\/\d+$/);
    await expect(page.getByRole('heading', { level: 1, name })).toBeVisible();
    await expect(
      page.getByRole('img', { name: `Guitarra ${name}` })
    ).toHaveAttribute(
      'src',
      /\/storage\/v1\/object\/public\/guitars\/\d+-guitarra_05\.jpg$/
    );

    await page.getByRole('link', { name: 'Volver al catálogo' }).click();
    await expect(page.getByRole('link', { name })).toBeVisible();
  });
});
