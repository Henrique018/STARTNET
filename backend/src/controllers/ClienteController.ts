import { Request, Response } from 'express';

import { db } from '../config/db';
import ClienteData from '../data/ClienteData';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const clientes = await ClienteData.getClients();
      return res.json(clientes).status(200);
    } catch (e) {
      return res.send(e).status(500);
    }
  },

  async store(req: Request, res: Response): Promise<Response> {
    const conn = await db();

    try {
      const {
        nome,
        email,
        cpf,
        rg,
        telefone,
        dataNascimento,
        endereco,
      } = req.body;

      const user = { nome, email, cpf, rg, telefone, dataNascimento };

      await conn.beginTransaction();

      const cliente = await ClienteData.storeClient(user);

      const lastInsertedId = cliente[0].insertId;

      await ClienteData.storeClientAdress(lastInsertedId, endereco);

      await conn.commit();

      return res.status(201).json(`User created with id: ${lastInsertedId}`);
    } catch (error) {
      await conn.rollback();
      return res.status(500).json(`create client failed, ${error}`);
    }
  },
};
