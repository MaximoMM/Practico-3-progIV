import { useEffect, useState } from 'react'

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  tipo: string;
}

function App() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargarMenu = async () => {
    try {
      setCargando(true)
      setError(null)
      const res = await fetch('/api/productos')
      if (!res.ok) throw new Error('Error al cargar el menú')
      const data = await res.json()
      setProductos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarMenu()
  }, [])

  if (cargando) return <div className="container mt-4"><p>Cargando menú...</p></div>
  
  if (error) return (
    <div className="container mt-4 alert alert-danger">
      <p>{error}</p>
      <button className="btn btn-danger" onClick={cargarMenu}>Reintentar</button>
    </div>
  )

  return (
    <div className="container mt-4">
      <h1 className="text-primary mb-4">Menú - Cafetería Origen</h1>
      <ul className="list-group">
        {productos.map(prod => (
          <li key={prod.id} className="list-group-item d-flex justify-content-between align-items-center">
            {prod.nombre}
            <span className="badge bg-secondary rounded-pill">${prod.precio}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App