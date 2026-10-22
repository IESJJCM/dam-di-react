import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('adds guitars, changes quantities and keeps the cart after a reload', async ({
    page,
  }) => {
    await page
      .getByRole('button', { name: 'Agregar al carrito Lukather' })
      .click();
    await page.getByRole('button', { name: 'Agregar al carrito SRV' }).click();
    await page.getByRole('button', { name: 'Abrir carrito' }).click();

    const cart = page.getByRole('complementary', { name: 'Tu carrito' });
    await expect(cart.getByRole('row')).toHaveCount(3);
    await expect(cart.getByText('$648')).toBeVisible();

    await cart
      .getByRole('button', { name: 'Añadir una unidad de Lukather' })
      .click();
    await expect(cart.getByText('$947')).toBeVisible();

    await page.reload();
    await page.getByRole('button', { name: 'Abrir carrito' }).click();
    await expect(cart.getByText('$947')).toBeVisible();

    await cart.getByRole('button', { name: 'Vaciar carrito' }).click();
    await expect(cart.getByText('El carrito está vacío')).toBeVisible();
  });

  test('closes the panel with the close button and with Escape', async ({
    page,
  }) => {
    const openButton = page.getByRole('button', { name: 'Abrir carrito' });
    const cart = page.getByRole('complementary', { name: 'Tu carrito' });

    await openButton.click();
    await expect(cart).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Cerrar carrito' })
    ).toBeFocused();

    await page.getByRole('button', { name: 'Cerrar carrito' }).click();
    await expect(cart).toBeHidden();

    await openButton.click();
    await page.keyboard.press('Escape');
    await expect(cart).toBeHidden();
  });

  test('has no accessibility violations with the cart open', async ({
    page,
  }) => {
    await page
      .getByRole('button', { name: 'Agregar al carrito Lukather' })
      .click();
    await page.getByRole('button', { name: 'Abrir carrito' }).click();

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
});
