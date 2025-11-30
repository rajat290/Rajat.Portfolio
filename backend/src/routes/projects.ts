import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  updateProjectOrder
} from '../controllers/projectController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validate, projectValidation } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Admin routes (protected)
router.post('/', authenticateToken, requireAdmin, validate(projectValidation.create), createProject);
router.put('/:id', authenticateToken, requireAdmin, validate(projectValidation.update), updateProject);
router.delete('/:id', authenticateToken, requireAdmin, deleteProject);
router.put('/:id/order', authenticateToken, requireAdmin, updateProjectOrder);

export default router;
