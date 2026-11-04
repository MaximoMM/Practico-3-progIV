import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app'; 

describe('TP3: Setup E2E', () => {
  it('POST /__test__/reset debe responder 200 en entorno de test', async () => {
    const res = await request(app).post('/__test__/reset');
    expect(res.status).toBe(200);
  });
  
  it('POST /__test__/seed debe responder 200 en entorno de test', async () => {
    const res = await request(app).post('/__test__/seed');
    expect(res.status).toBe(200);
  });
});