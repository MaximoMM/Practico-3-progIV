import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { postPedido } from '../api/client';

export default function Carrito({ mesaId, onPedidoConfirmado }: { mesaId?: number, onPedidoConfirmado: (id: number) => void }) {
  const { state, dispatch } = useCart();
  const [errorPost, setErrorPost] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const confirmarPedido = async () => {
    if (!mesaId) return setErrorPost('Error: Falta identificar la mesa en la URL (?mesa=X)');
    
    setEnviando(true);
    setErrorPost(null);
    
    const itemsParaEnviar = state.items.map(i => ({ productoId: i.producto.id, cantidad: i.cantidad }));

    try {
      const data = await postPedido(mesaId, itemsParaEnviar);
      dispatch({ type: 'VACIAR_CARRITO' }); 
      onPedidoConfirmado(data.id);
    } catch (error: any) {
      setErrorPost(error.message);
    } finally {
      setEnviando(false);
    }
  };

  if (state.items.length === 0) {
    return <div className="p-4 bg-light rounded text-center text-muted">Tu pedido está vacío</div>;
  }

  return (
    <div className="card border-primary shadow">
      <div className="card-header bg-primary text-white">Tu Pedido</div>
      <div className="card-body">
        {state.items.map(item => (
          <div key={item.producto.id} className="d-flex justify-content-between mb-2 pb-2 border-bottom">
            <div>
              <small className="d-block fw-bold">{item.producto.nombre}</small>
              <small className="text-muted">{item.cantidad} x ${item.producto.precio}</small>
            </div>
            <div className="btn-group btn-group-sm align-items-center">
              <button className="btn btn-outline-secondary" onClick={() => dispatch({ type: 'RESTAR_ITEM', payload: item.producto.id })}>-</button>
              <button className="btn btn-outline-danger" onClick={() => dispatch({ type: 'QUITAR_ITEM', payload: item.producto.id })}>x</button>
            </div>
          </div>
        ))}
        
        <h4 className="mt-3 text-end">Total orientativo: ${state.subtotal}</h4>
        
        {errorPost && <div className="alert alert-danger mt-2 py-2" role="alert">{errorPost}</div>}
        
        <button 
          className="btn btn-primary w-100 mt-2 fw-bold" 
          onClick={confirmarPedido} 
          disabled={enviando}
        >
          {enviando ? 'Enviando...' : 'Confirmar Pedido'}
        </button>
      </div>
    </div>
  );
}