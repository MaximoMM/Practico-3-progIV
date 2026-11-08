import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('GET /productos - Estado actual', () => {
  it('Debe devolver la lista de productos con su precioBase', async () => {
    const res = await request(app).get('/productos');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    res.body.forEach((producto: Record<string, unknown>) => {
      expect(producto.id).toBeDefined();
      expect(typeof producto.nombre).toBe('string');
      
      expect(typeof producto.precioBase).toBe('number');
      expect(Number(producto.precioBase)).toBeGreaterThan(0);
      
      if (producto.tipo) {
        expect(['expreso', 'filtrado']).toContain(producto.tipo);
      }
    });
  });
});