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

  constructor(id: number, items: ItemPedido[], estado: string = 'Pendiente', mesaId?: number) {
    this.id = id;
    this.items = items;
    this.estado = estado;
    this.mesaId = mesaId;
  }

  calcularTotal(productosDisponibles: Producto[]): number {
    return this.items.reduce((total, item) => {
      const prod = productosDisponibles.find(p => p.id === item.productoId);
      return total + (prod ? prod.calcularPrecio() * item.cantidad : 0);
    }, 0);
  }
}