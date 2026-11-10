import express, { Application, Request, Response, NextFunction } from 'express';
import cafeteriaRoutes from './src/routes/cafeteriaRoutes';

const app: Application = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    nombre: 'Cafetería Origen API',
    estado: 'En línea'
  });
});

app.use('/', cafeteriaRoutes);

if (process.env.NODE_ENV === 'test') {
  app.post('/__test__/reset', (_req: Request, res: Response) => {
    res.status(200).json({ mensaje: 'Estado reiniciado' });
  });
  app.post('/__test__/seed', (_req: Request, res: Response) => {
    res.status(200).json({ mensaje: 'Datos semilla cargados' });
  });
}

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada en la API' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;