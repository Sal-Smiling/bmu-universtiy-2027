import express from 'express';
import { getPrograms, getProgramById, createProgram, updateProgram, deleteProgram } from '../controllers/programController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPrograms).post(protect, authorize('admin', 'faculty'), createProgram);
router.route('/:id').get(getProgramById).put(protect, authorize('admin', 'faculty'), updateProgram).delete(protect, authorize('admin', 'faculty'), deleteProgram);

export default router;
