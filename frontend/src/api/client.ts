import { ProductoSchema, PedidoResponseSchema, type Producto, type PedidoResponse } from '../types';

export const fetchProductos = async (): Promise<Producto[]> => {
  const res = await fetch('/api/productos');
  if (!res.ok) throw new Error('No se pudo conectar con el servidor.');
  
  const data = await res.json();
  return ProductoSchema.array().parse(data); 
};

export const postPedido = async (mesaId: number, items: { productoId: number, cantidad: number }[]): Promise<PedidoResponse> => {
  const res = await fetch('/api/pedidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mesaId, items })
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al procesar el pedido');
  
  return PedidoResponseSchema.parse(data);
};

export const fetchPedido = async (id: number): Promise<PedidoResponse> => {
  const res = await fetch(`/api/pedidos/${id}`);
  if (!res.ok) throw new Error('No se pudo cargar el pedido.');
  
  const data = await res.json();
  return PedidoResponseSchema.parse(data);
};