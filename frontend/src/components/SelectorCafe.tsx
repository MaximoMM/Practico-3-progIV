import { useState, useMemo } from 'react';
import type { Producto } from '../types';
import { useCart } from '../context/CartContext';

export default function SelectorCafe({ productos }: { productos: Producto[] }) {
  const [bebida, setBebida] = useState('');
  const [tamano, setTamano] = useState('');
  const [origen, setOrigen] = useState('');
  const { dispatch } = useCart();

  // Busca el producto exacto basándose en las selecciones
  const productoSeleccionado = useMemo(() => {
    if (!bebida || !tamano || !origen) return null;
    const nombreBuscado = `${bebida} ${tamano} ${origen}`.toLowerCase();
    return productos.find(p => p.nombre.toLowerCase() === nombreBuscado) || null;
  }, [bebida, tamano, origen, productos]);

  const handleAgregar = () => {
    if (productoSeleccionado) {
      dispatch({ type: 'AGREGAR_ITEM', payload: productoSeleccionado });
      setBebida(''); setTamano(''); setOrigen('');
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h3 className="h5 mb-0">Arma tu Café</h3>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label fw-bold">1. Bebida</label>
          <select className="form-select" aria-label="Seleccionar bebida" value={bebida} onChange={e => {setBebida(e.target.value); setTamano(''); setOrigen('');}}>
            <option value="">Elegí...</option>
            <option value="Expreso">Expreso</option>
            <option value="Filtrado">Filtrado</option>
          </select>
        </div>

        {bebida && (
          <div className="mb-3">
            <label className="form-label fw-bold">2. Tamaño</label>
            <select className="form-select" aria-label="Seleccionar tamaño" value={tamano} onChange={e => {setTamano(e.target.value); setOrigen('');}}>
              <option value="">Elegí...</option>
              <option value="Pocillo">Pocillo</option>
              <option value="Mediano">Mediano</option>
              <option value="Taza grande">Taza grande</option>
            </select>
          </div>
        )}

        {tamano && (
          <div className="mb-3">
            <label className="form-label fw-bold">3. Origen</label>
            <select className="form-select" aria-label="Seleccionar origen" value={origen} onChange={e => setOrigen(e.target.value)}>
              <option value="">Elegí...</option>
              <option value="Colombia">Colombia (Acidez media, notas a cacao)</option>
              <option value="Brasil">Brasil (Cuerpo pesado, notas a nuez)</option>
              <option value="Etiopía">Etiopía (Acidez alta, notas florales)</option>
            </select>
          </div>
        )}

        {productoSeleccionado && (
          <div className="alert alert-success d-flex justify-content-between align-items-center mt-3">
            <span>Precio: <strong>${productoSeleccionado.precio}</strong></span>
            <button className="btn btn-success" onClick={handleAgregar} aria-label="Agregar café al pedido">
              Agregar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}