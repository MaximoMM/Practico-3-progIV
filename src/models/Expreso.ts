import { Producto } from './Producto';

export class Expreso extends Producto {
  tamano: string; 
  variedad: string; 

  constructor(id: number, nombre: string, tamano: string, variedad: string) {
    super(id, nombre, 2500, 'expreso');
    this.tamano = tamano;
    this.variedad = variedad;
  }

  calcularPrecio(): number {

    const gramosPorTamano: Record<string, number> = {
      'Pocillo': 18,
      'Mediano': 27,
      'Taza grande': 36
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