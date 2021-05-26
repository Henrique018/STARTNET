import { RowDataPacket } from 'mysql2/promise';

import { db } from '../config/db';

type ClientProps = {
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  telefone: string;
  dataNascimento: string;
};

type ClientAdress = {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export default {
  async getClients(): Promise<RowDataPacket[]> {
    const database = await db();
    const [rows] = await database.query<RowDataPacket[]>(
      'SELECT * FROM CLIENTE;'
    );
    return rows;
  },

  async storeClient(cliente: ClientProps) {
    const database = await db();

    return await database.query(
      'insert into CLIENTE (nome, email,rg,cpf,telefone,data_nasc) VALUES (?,?,?,?,?,?);',
      [
        cliente.nome,
        cliente.email,
        cliente.rg,
        cliente.cpf,
        cliente.telefone,
        cliente.dataNascimento,
      ]
    );
  },

  async storeClientAdress(userId: number, clientAdress: ClientAdress) {
    const database = await db();

    return await database.query(
      'insert into ENDERECO (cliente_ID,cep, logradouro,numero,bairro,cidade,estado) VALUES (?,?,?,?,?,?,?);',
      [
        userId,
        clientAdress.cep,
        clientAdress.logradouro,
        clientAdress.numero,
        clientAdress.bairro,
        clientAdress.cidade,
        clientAdress.estado,
      ]
    );
  },
};
