import { Producto } from './Producto';

export class Filtrado extends Producto {
  tamano: string;
  variedad: string;

  constructor(id: number, nombre: string, tamano: string, variedad: string) {
    super(id, nombre, 3200, 'filtrado'); 
    this.tamano = tamano;
    this.variedad = variedad;
  }

  calcularPrecio(): number {
    let gramos = 0;
    switch (this.tamano) {
      case 'Pocillo': gramos = 6; break;
      case 'Mediano': gramos = 15; break;
      case 'Taza grande': gramos = 25; break;
    }

    let precioPorGramos = 0;
    switch (this.variedad) {
      case 'Brasil': precioPorGramos = 140; break;
      case 'Colombia': precioPorGramos = 180; break;
      case 'Etiopía': precioPorGramos = 240; break;
    }

    // Refactor mini: calculamos y retornamos en la misma línea
    return this.precioBase + (gramos * precioPorGramos);
  }
}