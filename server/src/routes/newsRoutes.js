import express from 'express';
import { getNews, getNewsById, createNews, updateNews, deleteNews } from '../controllers/newsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getNews).post(protect, authorize('admin', 'faculty'), createNews);
router.route('/:id').get(getNewsById).put(protect, authorize('admin', 'faculty'), updateNews).delete(protect, authorize('admin', 'faculty'), deleteNews);

export default router;
