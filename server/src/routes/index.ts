import { Router } from 'express';
import authRoutes from './authRoutes';
import countryRoutes from './countryRoutes';
import universityRoutes from './universityRoutes';
import currencyRoutes from './currencyRoutes';
import searchRoutes from './searchRoutes';
import adminRoutes from './adminRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/countries', countryRoutes);
router.use('/universities', universityRoutes);
router.use('/currency', currencyRoutes);
router.use('/search', searchRoutes);
router.use('/admin', adminRoutes);

export default router;
