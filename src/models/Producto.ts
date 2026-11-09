export type TipoProducto = 'expreso' | 'filtrado' | 'pasteleria';

export abstract class Producto {
  nombre: string;
  precioBase: number;
  id: number;
  tipo: TipoProducto; 

  constructor(id: number, nombre: string, precioBase: number, tipo: TipoProducto) { 
    this.id = id;
    this.nombre = nombre;
    this.precioBase = precioBase;
    this.tipo = tipo;
  }

  abstract calcularPrecio(): number;

  get precio(): number {
    return this.calcularPrecio();
  }
}