import { Producto } from './Producto';

export interface ItemPedido {
  productoId: number;
  cantidad: number;
  producto?: Producto; 
}

export class Pedido {
  id: number;
  items: ItemPedido[];
  estado: string;
  mesaId?: number; 
  total?: number;  

  constructor(id: number, items: ItemPedido[], estado: string = 'Pendiente', mesaId?: number) {
    this.id = id;
    this.items = items;
    this.estado = estado;
    this.mesaId = mesaId; 
  }

  calcularTotal(productosDisponibles: Producto[]): number {
    let total = 0;
    for (const item of this.items) {
      const prod = productosDisponibles.find(p => p.id === item.productoId);
      if (prod) {
        // Refactor: usamos el getter 'precio'
        total += prod.precio * item.cantidad; 
      }
    }
    return total;
  }
}