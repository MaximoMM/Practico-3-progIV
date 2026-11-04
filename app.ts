
import express from 'express';
import cors from 'cors'; 
import cafeteriaRoutes from './src/routes/cafeteriaRoutes';

const app = express();
app.use(cors()); 
app.use(express.json());
app.use('/', cafeteriaRoutes);

if (process.env.NODE_ENV === 'test') {
    app.post('/__test__/reset', (req, res) => { res.status(200).send(); });
    app.post('/__test__/seed', (req, res) => { res.status(200).send(); });
}
export default app;