import { useEffect, useState } from 'react';
import type { MenuState } from './types';
import { CartProvider } from './context/CartContext';
import SelectorCafe from './components/SelectorCafe';
import Pasteleria from './components/Pasteleria';
import Carrito from './components/Carrito';
import Seguimiento from './components/Seguimiento';
import { fetchProductos } from './api/client';

function App() {
  const [menuState, setMenuState] = useState<MenuState>({ estado: 'cargando' });
  const [pedidoId, setPedidoId] = useState<number | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const mesaQuery = searchParams.get('mesa');
  const mesaId = mesaQuery ? parseInt(mesaQuery) : undefined;

  useEffect(() => {
    fetchProductos()
      .then(data => setMenuState({ estado: 'listo', productos: data }))
      .catch(err => setMenuState({ estado: 'error', mensaje: err.message }));
  }, []);

  if (menuState.estado === 'cargando') {
    return <div className="container mt-5 text-center"><div className="spinner-border text-primary" role="status" aria-label="Cargando menú"></div></div>;
  }
  if (menuState.estado === 'error') {
    return <div className="container mt-5 alert alert-danger" role="alert">{menuState.mensaje}</div>;
  }
  if (pedidoId) {
    return <Seguimiento pedidoId={pedidoId} onVolver={() => setPedidoId(null)} />;
  }

  return (
    <CartProvider>
      <div className="container mt-4 mb-5" style={{ maxWidth: '900px' }}>
        <header className="mb-4 text-center">
          <h1 className="text-primary fw-bold">Cafetería Origen</h1>
          {mesaId ? (
            <span className="badge bg-secondary fs-6">Mesa asignada: {mesaId}</span>
          ) : (
            <div className="alert alert-warning py-2" role="alert">¡No hay mesa asignada en la URL!</div>
          )}
        </header>
        <div className="row g-4">
          <div className="col-md-7">
            <SelectorCafe productos={menuState.productos} />
            <Pasteleria productos={menuState.productos} />
          </div>
          <div className="col-md-5">
            <div className="sticky-top" style={{ top: '20px' }}>
              <Carrito mesaId={mesaId} onPedidoConfirmado={setPedidoId} />
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;