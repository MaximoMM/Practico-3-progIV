# TP3: Cafetería Origen

## Integrantes:
- Maximo Martinez Moraes
- Lucas Rojas
- Tiago de Rosa

## Requisitos previos
- Node.js instalado.
- API del Parcial I actualizada con los cambios requeridos (`mesaId` opcional, rutas de precios y tipos en productos, control de errores y endpoints de test `/__test__/reset` y `/__test__/seed`).

---

## Cómo levantar el proyecto

### 1. Levantar el Backend (API)
Desde la raíz del repositorio:
```bash
npm install
npm run dev
```

### 2. Levantar el Frontend
Entrada la carpeta del front y ejecutar el entorno de desarrollo con Vite:
```bash
cd frontend
npm install
npm run dev
```
*(El front correrá en `http://localhost:5173` y redirigirá las peticiones `/api` al backend mediante el proxy configurado).*

---

## Cómo correr los Tests

### Backend y Unitarios/Componentes/Integración (Frontend)
Para correr los tests unitarios, de componentes y de integración (Vitest) sin necesidad de tener la API levantada:
```bash
# En la raíz o en la carpeta frontend según corresponda
npm test
```

### Tests End-to-End (E2E con Playwright)
Para correr los tests E2E asegurándote de que el front y la API estén funcionando:
```bash
npm run test:e2e
```

---

## Contrato de la API (Endpoints utilizados)

- **`GET /productos`**: Devuelve la lista completa de productos con su `id`, `nombre`, `precio` calculado y `tipo` (`expreso`, `filtrado` o `pasteleria`).
- **`GET /productos/:id`**: Devuelve el detalle de un producto específico.
- **`POST /pedidos`**: Recibe un JSON con los ítems y opcionalmente el `mesaId`. Retorna el pedido creado con su estado inicial y el total calculado por la API.
- **`GET /pedidos/:id`**: Permite consultar el estado actualizado de un pedido en tiempo real para el seguimiento.
