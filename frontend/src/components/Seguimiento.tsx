import { useEffect, useState } from 'react';
import { fetchPedido } from '../api/client';

export default function Seguimiento({ pedidoId, onVolver }: { pedidoId: number, onVolver: () => void }) {
  const [estadoPedido, setEstadoPedido] = useState<string>('cargando...');

  const consultarEstado = async () => {
    try {
      const data = await fetchPedido(pedidoId);
      setEstadoPedido(data.estado);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    consultarEstado();
    const intervalo = setInterval(consultarEstado, 5000);
    return () => clearInterval(intervalo);
  }, [pedidoId]);

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-lg p-5">
        <h2 className="mb-4">Pedido #{pedidoId}</h2>
        <h1 className="display-4 text-primary text-uppercase mb-4">{estadoPedido}</h1>
        <p className="text-muted">La pantalla se actualiza automáticamente...</p>
        <button className="btn btn-outline-secondary mt-4 w-50 mx-auto" onClick={onVolver}>
          Volver al Menú
        </button>
      </div>
    </div>
  );
}