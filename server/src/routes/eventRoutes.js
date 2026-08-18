import express from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getEvents).post(protect, authorize('admin', 'faculty'), createEvent);
router.route('/:id').get(getEventById).put(protect, authorize('admin', 'faculty'), updateEvent).delete(protect, authorize('admin', 'faculty'), deleteEvent);

export default router;
