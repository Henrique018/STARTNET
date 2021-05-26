import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import cepRoutes from './routes/cep';
import clienteRoutes from './routes/cliente';

//carregar variaveis de ambiente
dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use('/cep', cepRoutes);
app.use('/cliente', clienteRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`App started on port ${PORT} in ${process.env.NODE_ENV} mode`)
);
