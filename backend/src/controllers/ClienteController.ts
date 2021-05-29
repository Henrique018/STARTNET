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
        senha,
        cpf,
        rg,
        telefone,
        dataNascimento,
        endereco,
      } = req.body;

      const user = { nome, email, cpf, rg, telefone, dataNascimento, senha };

      await conn.beginTransaction();

      const results = await ClienteData.storeClient(user);
      const resultSet: any = results;

      if (resultSet?.existingUser) {
        return res
          .status(400)
          .json(`User already exists with id ${resultSet.existingUser}`);
      }

      await ClienteData.storeClientAdress(resultSet[0].insertId, endereco);

      await conn.commit();

      return res
        .status(201)
        .json(`User created with id: ${resultSet[0].insertId}`);
    } catch (error) {
      await conn.rollback();
      return res.status(500).json(`create client failed, ${error}`);
    }
  },
};
