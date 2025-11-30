import express from 'express';
import {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactStats
} from '../controllers/contactController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validate, contactValidation } from '../middleware/validation';

const router = express.Router();

// Public routes
router.post('/', validate(contactValidation.create), submitContact);

// Admin routes (protected)
router.get('/', authenticateToken, requireAdmin, getContacts);
router.get('/stats', authenticateToken, requireAdmin, getContactStats);
router.get('/:id', authenticateToken, requireAdmin, getContact);
router.put('/:id', authenticateToken, requireAdmin, updateContact);
router.delete('/:id', authenticateToken, requireAdmin, deleteContact);

export default router;
