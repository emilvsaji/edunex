import { Router } from 'express';
import {
  getAdminStats,
  createUniversity,
  updateUniversity,
  deleteUniversity,
  createFAQ,
  deleteFAQ,
} from '../controllers/adminController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Protect all admin routes
router.use(authenticateToken, requireAdmin);

router.get('/stats', getAdminStats);
router.post('/universities', createUniversity);
router.put('/universities/:id', updateUniversity);
router.delete('/universities/:id', deleteUniversity);
router.post('/faqs', createFAQ);
router.delete('/faqs/:id', deleteFAQ);

export default router;
