import { Producto } from '../../src/models/Producto'; 

class ProductoMock extends Producto {
  constructor() { super(1, 'Test', 100, 'expreso'); }
  calcularPrecio() { return 150; }
}

it('Producto debe inicializarse con un tipo y exponer la propiedad precio', () => {
  const p = new ProductoMock();
  expect(p.tipo).toBe('expreso');
  expect(p.precio).toBe(150);
});