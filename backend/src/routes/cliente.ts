import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';

const ClientRouter = Router();

ClientRouter.get('/', ClienteController.index);
ClientRouter.post('/', ClienteController.store);

export default ClientRouter;
