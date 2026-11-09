import { Pedido, ItemPedido } from '../src/models/Pedido'; 

it('Pedido debe aceptar un mesaId opcional según el contrato del TP3', () => {
  const items: ItemPedido[] = [{ productoId: 1, cantidad: 1 }];
  

  const pedidoConMesa = new Pedido(1, items, 'Pendiente', 4);

  const pedidoSinMesa = new Pedido(2, items, 'Pendiente');

  expect(pedidoConMesa.mesaId).toBe(4);
  expect(pedidoSinMesa.mesaId).toBeUndefined();
});