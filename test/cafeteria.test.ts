import { Expreso } from '../models/Expreso';

test('Expreso debe tener tipo "expreso" y exponer la propiedad precio calculada', () => {
  const expreso = new Expreso(5, 'Expreso Mediano', 'Mediano', 'Colombia');
  expect(expreso.tipo).toBe('expreso'); //[cite: 3]
  expect(expreso.precio).toBe(7360); //[cite: 3]
});