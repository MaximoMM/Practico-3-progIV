import express from 'express';
import cors from 'cors';
import cafeteriaRoutes from './src/routes/cafeteriaRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', cafeteriaRoutes);

if (process.env.NODE_ENV === 'test') {
    const testRouter = express.Router();

    testRouter.post('/reset', (req, res) => {
        res.status(200).send({ message: 'Base de datos reiniciada' });
    });

    testRouter.post('/seed', (req, res) => {
        res.status(200).send({ message: 'Datos de prueba cargados' });
    });

    app.use('/__test__', testRouter);
}

export default app;