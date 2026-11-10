import { z } from 'zod';

export const ProductoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  precio: z.number(),
  tipo: z.enum(['expreso', 'filtrado', 'pasteleria'])
});

export const PedidoResponseSchema = z.object({
  id: z.number(),
  items: z.array(z.object({
    productoId: z.number(),
    cantidad: z.number()
  })),
  estado: z.string(),
  mesaId: z.number().optional(),
  total: z.number()
});

export type Producto = z.infer<typeof ProductoSchema>;
export type PedidoResponse = z.infer<typeof PedidoResponseSchema>;

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export type MenuState =
  | { estado: 'cargando' }
  | { estado: 'error'; mensaje: string }
  | { estado: 'listo'; productos: Producto[] };