import express from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  updateServiceOrder,
  deleteService
} from '../controllers/serviceController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validate, serviceValidation } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:id', getService);

// Admin routes (protected)
router.post('/', authenticateToken, requireAdmin, validate(serviceValidation.create), createService);
router.put('/:id', authenticateToken, requireAdmin, validate(serviceValidation.update), updateService);
router.delete('/:id', authenticateToken, requireAdmin, deleteService);

export default router;
