import express from 'express';
import {
  getScholarships,
  createScholarship,
  updateScholarship,
  deleteScholarship
} from '../controllers/scholarshipController.js';

const router = express.Router();

router.get('/', getScholarships);
router.post('/', createScholarship);
router.put('/:id', updateScholarship);
router.delete('/:id', deleteScholarship);

export default router;
