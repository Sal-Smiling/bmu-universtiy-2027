import express from 'express';
import { getPartners, getPartnerById, createPartner, updatePartner, deletePartner } from '../controllers/partnerController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPartners).post(protect, authorize('admin', 'faculty'), createPartner);
router.route('/:id').get(getPartnerById).put(protect, authorize('admin', 'faculty'), updatePartner).delete(protect, authorize('admin', 'faculty'), deletePartner);

export default router;
