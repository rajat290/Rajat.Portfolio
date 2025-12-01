import express from 'express';
import {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  updateExperienceOrder,
  deleteExperience
} from '../controllers/experienceController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validate, experienceValidation } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', getExperiences);
router.get('/:id', getExperience);

// Admin routes (protected)
router.post('/', authenticateToken, requireAdmin, validate(experienceValidation.create), createExperience);
router.put('/:id', authenticateToken, requireAdmin, validate(experienceValidation.update), updateExperience);
router.put('/:id/order', authenticateToken, requireAdmin, updateExperienceOrder);
router.delete('/:id', authenticateToken, requireAdmin, deleteExperience);

export default router;
