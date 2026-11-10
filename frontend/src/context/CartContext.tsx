import { createContext, useReducer, useContext, type ReactNode } from 'react';
import type { ItemCarrito, Producto } from '../types';

export type CartAction =
  | { type: 'AGREGAR_ITEM'; payload: Producto }
  | { type: 'RESTAR_ITEM'; payload: number } // id del producto
  | { type: 'QUITAR_ITEM'; payload: number }
  | { type: 'VACIAR_CARRITO' };

export interface CartState {
  items: ItemCarrito[];
  subtotal: number;
}

export const initialCartState: CartState = {
  items: [],
  subtotal: 0
};

const calcularSubtotal = (items: ItemCarrito[]) => 
  items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'AGREGAR_ITEM': {
      const existe = state.items.find(i => i.producto.id === action.payload.id);
      const nuevosItems = existe 
        ? state.items.map(i => i.producto.id === action.payload.id ? { ...i, cantidad: i.cantidad + 1 } : i)
        : [...state.items, { producto: action.payload, cantidad: 1 }];
      return { items: nuevosItems, subtotal: calcularSubtotal(nuevosItems) };
    }
    case 'RESTAR_ITEM': {
      const nuevosItems = state.items.map(i => 
        i.producto.id === action.payload ? { ...i, cantidad: Math.max(1, i.cantidad - 1) } : i
      );
      return { items: nuevosItems, subtotal: calcularSubtotal(nuevosItems) };
    }
    case 'QUITAR_ITEM': {
      const nuevosItems = state.items.filter(i => i.producto.id !== action.payload);
      return { items: nuevosItems, subtotal: calcularSubtotal(nuevosItems) };
    }
    case 'VACIAR_CARRITO':
      return initialCartState;
    default:
      return state;
  }
};

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};

