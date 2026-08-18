import express from 'express';
import { getPartnerships, createPartnership, updatePartnership, deletePartnership } from '../controllers/partnershipController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPartnerships)
  .post(protect, authorize('admin', 'faculty'), createPartnership);

router.route('/:id')
  .put(protect, authorize('admin', 'faculty'), updatePartnership)
  .delete(protect, authorize('admin', 'faculty'), deletePartnership);

export default router;
