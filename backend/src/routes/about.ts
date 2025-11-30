import express from 'express';
import {
  getAboutSections,
  getAboutSection,
  createAboutSection,
  updateAboutSection,
  deleteAboutSection,
  updateAboutSectionOrder
} from '../controllers/aboutController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validate, aboutValidation } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', getAboutSections);
router.get('/:id', getAboutSection);

// Admin routes (protected)
router.post('/', authenticateToken, requireAdmin, validate(aboutValidation.create), createAboutSection);
router.put('/:id', authenticateToken, requireAdmin, validate(aboutValidation.update), updateAboutSection);
router.put('/:id/order', authenticateToken, requireAdmin, updateAboutSectionOrder);
router.delete('/:id', authenticateToken, requireAdmin, deleteAboutSection);

export default router;
