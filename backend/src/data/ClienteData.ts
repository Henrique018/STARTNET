import { RowDataPacket } from 'mysql2/promise';

import { db } from '../config/db';
import encrypt from '../utils/encrypt';

type ClientProps = {
  nome: string;
  email: string;
  senha: string;
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

    const [
      rows,
    ] = await database.query(
      'SELECT `cliente_ID` from `CLIENTE` WHERE `cpf` = ?;',
      [cliente.cpf]
    );

    const resultSet: any = rows;
    const existingUser = resultSet[0]?.cliente_ID;

    if (!existingUser) {
      const hashPassword = await encrypt.hash(cliente.senha);

      return await database.execute(
        'insert into CLIENTE (nome,email,senha,rg,cpf,telefone,data_nasc) VALUES (?,?,?,?,?,?,?);',
        [
          cliente.nome,
          cliente.email,
          hashPassword,
          cliente.rg,
          cliente.cpf,
          cliente.telefone,
          cliente.dataNascimento,
        ]
      );
    }

    return { existingUser };
  },

  async storeClientAdress(userId: number, clientAdress: ClientAdress) {
    const database = await db();

    return await database.execute(
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
