import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import cepRoutes from './routes/cep';

//carregar variaveis de ambiente
dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use(cepRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`App started on port ${PORT} in ${process.env.NODE_ENV} mode`)
);
