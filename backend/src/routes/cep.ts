import { Router } from 'express';
import CepController from '../controllers/CepController';

const router = Router();

router.post('/', CepController);

export default router;
