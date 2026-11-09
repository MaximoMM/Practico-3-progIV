import { Expreso } from '../../src/models/Expreso'; // Ajustá la ruta según tu proyecto

it('Expreso debe inicializarse con el tipo "expreso" para el frontend', () => {
  const expreso = new Expreso(1, 'Expreso de prueba', 'Mediano', 'Colombia');
  
  // Verificamos que herede correctamente la propiedad tipo
  expect(expreso.tipo).toBe('expreso'); 
});