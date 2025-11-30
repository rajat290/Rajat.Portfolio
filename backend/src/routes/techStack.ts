import express from 'express';
import {
  getTechStack,
  getTechStackCategory,
  createTechStackCategory,
  updateTechStackCategory,
  deleteTechStackCategory
} from '../controllers/techStackController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validate, techStackValidation } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', getTechStack);
router.get('/:id', getTechStackCategory);

// Admin routes (protected)
router.post('/', authenticateToken, requireAdmin, validate(techStackValidation.create), createTechStackCategory);
router.put('/:id', authenticateToken, requireAdmin, validate(techStackValidation.update), updateTechStackCategory);
router.delete('/:id', authenticateToken, requireAdmin, deleteTechStackCategory);

export default router;
