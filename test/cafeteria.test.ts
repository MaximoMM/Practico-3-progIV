import { test, expect } from 'vitest';
import { Expreso } from '../src/models/Expreso';
import { Filtrado } from '../src/models/Filtrado';
import { Pedido } from '../src/models/Pedido'; 

test('Expreso debe tener tipo "expreso" y exponer la propiedad precio calculada', () => {
  const expreso = new Expreso(5, 'Expreso Mediano', 'Mediano', 'Colombia');
  expect(expreso.tipo).toBe('expreso');
  expect(expreso.precio).toBe(7360);
});

test('Filtrado debe tener tipo "filtrado" y exponer su precio calculando correctamente', () => {
  const filtrado = new Filtrado(10, 'Filtrado Pocillo', 'Pocillo', 'Brasil');
  expect(filtrado.tipo).toBe('filtrado');
  expect(filtrado.precio).toBe(4040);
});

// NUEVO TEST
test('Pedido debe aceptar mesaId opcional y poder calcular su total', () => {
  const pedido = new Pedido(1, [{ productoId: 5, cantidad: 2 }], 'Pendiente', 4);
  
  expect(pedido.mesaId).toBe(4); 
  
  const productosMock = [new Expreso(5, 'Expreso Mediano', 'Mediano', 'Colombia')];
  pedido.total = pedido.calcularTotal(productosMock); 
  
  expect(pedido.total).toBe(14720); 
});