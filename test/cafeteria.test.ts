import { describe, test, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { Expreso } from '../src/models/Expreso';
import { Filtrado } from '../src/models/Filtrado';
import { Pasteleria } from '../src/models/Pasteleria';
import { Pedido } from '../src/models/Pedido';
import { productos, pedidos } from '../src/data/data';

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

describe('POST /pedidos', () => {
  it('Debe crear un pedido con mesaId y devolverlo', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({ mesaId: 4, items: [{ productoId: 1, cantidad: 2 }] });

    expect(res.status).toBe(201);
    expect(res.body.mesaId).toBe(4);
    expect(res.body.total).toBeDefined();
  });

  it('Debe crear un pedido sin mesaId si es para llevar (opcional)', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({ items: [{ productoId: 1, cantidad: 1 }] });

    expect(res.status).toBe(201);
    expect(res.body.mesaId).toBeUndefined();
  });
});

describe('GET /pedidos/:id', () => {
  it('Debe devolver el pedido incluyendo su total calculado', async () => {
    const resPost = await request(app)
      .post('/pedidos')
      .send({ items: [{ productoId: 19, cantidad: 1 }] });
    const id = resPost.body.id;
    
    const resGet = await request(app).get(`/pedidos/${id}`);
    expect(resGet.status).toBe(200);
    expect(resGet.body.id).toBe(id);
    expect(resGet.body.total).toBe(2500);
  });
});

describe('GET /pedidos', () => {
  it('Debe devolver la lista de todos los pedidos registrados', async () => {
    const res = await request(app).get('/pedidos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('Reportes de Cafetería', () => {
  it('Debe calcular la facturación total correctamente', async () => {
    const res = await request(app).get('/reportes/facturacion');
    expect(res.status).toBe(200);
    expect(res.body.facturacionTotal).toBeDefined();
    expect(typeof res.body.facturacionTotal).toBe('number');
  });

  it('Debe manejar error 404 si se busca un producto inexistente', async () => {
    const res = await request(app).get('/productos/9999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });

  it('Debe manejar error 404 si se busca un pedido inexistente', async () => {
    const res = await request(app).get('/pedidos/9999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});