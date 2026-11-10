import { test, expect } from '@playwright/test';

test.describe('Cafetería Origen - E2E Recorrido Feliz', () => {
  
  test.beforeEach(async ({ request }) => {
    await request.post('http://localhost:3000/__test__/reset');
    await request.post('http://localhost:3000/__test__/seed');
  });

  test('Debe simular el escaneo de QR con mesa, agregar producto, confirmar y ver seguimiento', async ({ page }) => {
    await page.goto('http://localhost:5173/?mesa=4');

    await expect(page.locator('h1')).toHaveText('Cafetería Origen');
    await expect(page.locator('.badge')).toContainText('Mesa asignada: 4');

    const botonAgregar = page.locator('button:has-text("+")').first();
    await botonAgregar.click();

    const botonConfirmar = page.locator('button:has-text("Confirmar Pedido")');
    await botonConfirmar.click();

    await expect(page.locator('h2')).toContainText('Pedido #');
    await expect(page.locator('.text-uppercase')).toBeVisible();
  });
});