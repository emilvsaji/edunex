import { Router } from 'express';
import { getUniversities, getUniversityBySlug } from '../controllers/universityController';

const router = Router();

router.get('/', getUniversities);
router.get('/:slug', getUniversityBySlug);

export default router;
