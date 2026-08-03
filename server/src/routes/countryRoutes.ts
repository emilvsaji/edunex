import { Router } from 'express';
import { getAllCountries, getCountryBySlug } from '../controllers/countryController';

const router = Router();

router.get('/', getAllCountries);
router.get('/:slug', getCountryBySlug);

export default router;
