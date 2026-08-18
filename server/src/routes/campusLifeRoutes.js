import express from 'express';
import {
  getCampusLife,
  createCampusLife,
  updateCampusLife,
  deleteCampusLife
} from '../controllers/campusLifeController.js';

const router = express.Router();

router.get('/', getCampusLife);
router.post('/', createCampusLife);
router.put('/:id', updateCampusLife);
router.delete('/:id', deleteCampusLife);

export default router;
