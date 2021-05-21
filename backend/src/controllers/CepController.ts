import { Request, Response } from 'express';
import axios from 'axios';

async function CepController(req: Request, res: Response): Promise<Response> {
  const cep = req.body.cep;

  const endpoint = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await axios.get(endpoint);

  const { ddd, uf, localidade, bairro, logradouro } = response.data;

  if (ddd != 11) {
    return res
      .json({
        noService: `Infelizmente nossos serviços ainda não estão disponiveis para ${localidade} :(`,
      })
      .status(200);
  }

  // TODO - Salvar no banco de dados
  return res.json({ ddd, uf, localidade, bairro, logradouro }).status(200);
}

export default CepController;
