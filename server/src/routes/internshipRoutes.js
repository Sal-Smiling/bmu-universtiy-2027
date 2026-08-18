import express from 'express';
import { getInternships, getInternshipById, createInternship, updateInternship, deleteInternship } from '../controllers/internshipController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getInternships).post(protect, authorize('admin', 'faculty'), createInternship);
router.route('/:id').get(getInternshipById).put(protect, authorize('admin', 'faculty'), updateInternship).delete(protect, authorize('admin', 'faculty'), deleteInternship);

export default router;
