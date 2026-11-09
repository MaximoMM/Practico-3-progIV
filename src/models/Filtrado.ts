import { Filtrado } from '../src/models/Filtrado'; 

it('Filtrado debe inicializarse con el tipo "filtrado" para el frontend', () => {
  const filtrado = new Filtrado(2, 'Filtrado de prueba', 'Pocillo', 'Brasil');
  
  expect(filtrado.tipo).toBe('filtrado'); 
});