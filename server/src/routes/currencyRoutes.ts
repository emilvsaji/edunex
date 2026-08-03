import { Router } from 'express';
import { getCurrencyRate } from '../controllers/currencyController';

const router = Router();

router.get('/rate', getCurrencyRate);

export default router;
