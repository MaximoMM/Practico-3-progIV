import { describe, it, expect } from 'vitest';
import { cartReducer, initialCartState } from './CartContext';

describe('CartReducer (TDD - Unitario)', () => {
  it('Debe agregar un item y calcular el subtotal orientativo', () => {
    const productoMock = { id: 1, nombre: 'Expreso', precio: 5020, tipo: 'expreso' as const };
    const action = { type: 'AGREGAR_ITEM' as const, payload: productoMock };
    
    const newState = cartReducer(initialCartState, action);
    
    expect(newState.items.length).toBe(1);
    expect(newState.items[0].cantidad).toBe(1);
    expect(newState.subtotal).toBe(5020);
  });

  it('Debe vaciar el carrito correctamente', () => {
    const stateConItems = {
      items: [{ producto: { id: 1, nombre: 'Expreso', precio: 5020, tipo: 'expreso' as const }, cantidad: 2 }],
      subtotal: 10040
    };
    
    const newState = cartReducer(stateConItems, { type: 'VACIAR_CARRITO' });
    expect(newState.items.length).toBe(0);
    expect(newState.subtotal).toBe(0);
  });
});