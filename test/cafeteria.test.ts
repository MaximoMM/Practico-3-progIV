describe('TP3: Contrato de la API para el Menú', () => {
  it('GET /productos debe incluir precio (calculado) y tipo (expreso, filtrado o pasteleria)', async () => {
    const res = await request(app).get('/productos');
    expect(res.status).toBe(200);
    
    expect(res.body[0]).toHaveProperty('precio'); 
    expect(res.body[0]).toHaveProperty('tipo'); 
    expect(['expreso', 'filtrado', 'pasteleria']).toContain(res.body[0].tipo); 
  });

  it('POST /pedidos acepta mesaId opcional y devuelve el pedido con su estado y total', async () => {
    const payload = {
      mesaId: 4,
      items: [{ productoId: 1, cantidad: 2 }] 
    };
    const res = await request(app).post('/pedidos').send(payload);
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('mesaId', 4); 
    expect(res.body).toHaveProperty('estado', 'pendiente'); 
    expect(res.body).toHaveProperty('total'); 
  });

  it('Los errores devuelven formato { error: "mensaje" } y código 400/404, nunca 500', async () => {
    const payloadInvalido = {
      items: [{ productoId: 9999, cantidad: 1 }]
    };
    const res = await request(app).post('/pedidos').send(payloadInvalido);
    
    expect(res.status).toBeGreaterThanOrEqual(400); 
    expect(res.status).toBeLessThan(500); 
    expect(res.body).toHaveProperty('error'); 
  });
});