import type { Producto } from '../types';
import { useCart } from '../context/CartContext';

export default function Pasteleria({ productos }: { productos: Producto[] }) {
  const { dispatch } = useCart();
  const pasteleria = productos.filter(p => p.tipo === 'pasteleria');

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-secondary text-white">
        <h3 className="h5 mb-0">Pastelería</h3>
      </div>
      <ul className="list-group list-group-flush">
        {pasteleria.map(prod => (
          <li key={prod.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <span className="d-block fw-bold">{prod.nombre}</span>
              <span className="text-muted">${prod.precio}</span>
            </div>
            <button 
              className="btn btn-sm btn-outline-primary"
              aria-label={`Agregar ${prod.nombre}`}
              onClick={() => dispatch({ type: 'AGREGAR_ITEM', payload: prod })}
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}