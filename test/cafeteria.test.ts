import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('GET /productos', () => {
  it('Debe devolver la lista de productos con su precio calculado y tipo', async () => {
    const res = await request(app).get('/productos');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    
    res.body.forEach((producto: Record<string, unknown>) => {
      expect(producto.id).toBeDefined();
      expect(producto.nombre).toBeDefined();
      expect(typeof producto.precio).toBe('number');
      expect(Number(producto.precio)).toBeGreaterThan(0);
      expect(['expreso', 'filtrado', 'pasteleria']).toContain(producto.tipo);
    });
  });
});

describe('GET /productos/:id', () => {
  it('Debe devolver un producto especifico con su precio calculado y tipo', async () => {
    const res = await request(app).get('/productos/1');
    
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.nombre).toBe('Expreso Pocillo Brasil');
    
    expect(res.body.precio).toBe(5020); 
    expect(res.body.tipo).toBe('expreso');
  });
});