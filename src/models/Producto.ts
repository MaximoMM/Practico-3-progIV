export abstract class Producto {
  id: number;
  nombre: string;
  precioBase: number;
  tipo: string; 
  precio: number = 0; 

  constructor(id: number, nombre: string, precioBase: number, tipo: string) {
    this.id = id;
    this.nombre = nombre;
    this.precioBase = precioBase;
    this.tipo = tipo;
  }
  abstract calcularPrecio(): number;
}