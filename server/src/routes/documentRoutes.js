import express from 'express';
import { getDocuments, uploadDocument, updateDocument, deleteDocument } from '../controllers/documentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getDocuments);

router.post('/upload', protect, adminOnly, upload.single('file'), uploadDocument);
router.route('/:id').put(protect, adminOnly, updateDocument).delete(protect, adminOnly, deleteDocument);

export default router;
