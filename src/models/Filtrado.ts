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
    const gramosPorTamano: Record<string, number> = {
      'Pocillo': 6,
      'Mediano': 15,
      'Taza grande': 25
    };

    const precioPorVariedad: Record<string, number> = {
      'Brasil': 140,
      'Colombia': 180,
      'Etiopía': 240
    };

    const gramos = gramosPorTamano[this.tamano] || 0;
    const precioPorGramos = precioPorVariedad[this.variedad] || 0;

    return this.precioBase + (gramos * precioPorGramos);
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      precioBase: this.precioBase,
      tipo: this.tipo,
      tamano: this.tamano,
      variedad: this.variedad,
      precio: this.calcularPrecio() 
    };
  }
}