export abstract class Producto {
  id: number;
  nombre: string;
  precioBase: number;
  tipo: string;

  constructor(id: number, nombre: string, precioBase: number, tipo: string) {
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