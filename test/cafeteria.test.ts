import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('GET /productos - Estado actual', () => {
  it('Debe devolver la lista de productos con su precioBase (pasa en verde sin tocar los modelos)', async () => {
    const res = await request(app).get('/productos');
    
  
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    res.body.forEach((producto: any) => {
      expect(producto.id).toBeDefined();
      expect(typeof producto.nombre).toBe('string');
      
      // Evaluamos precioBase en lugar de 'precio'
      expect(typeof producto.precioBase).toBe('number');
      expect(producto.precioBase).toBeGreaterThan(0);
      

      if (producto.tipo) {
        expect(['expreso', 'filtrado']).toContain(producto.tipo);
      }
    });
  });
});