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
  mesaId?: number; // Propiedad agregada

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
        total += prod.calcularPrecio() * item.cantidad;
      }
    }
    return total;
  }
}