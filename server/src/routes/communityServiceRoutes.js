import express from 'express';
import {
  getCommunityServices,
  createCommunityService,
  updateCommunityService,
  deleteCommunityService
} from '../controllers/communityServiceController.js';

const router = express.Router();

router.get('/', getCommunityServices);
router.post('/', createCommunityService);
router.put('/:id', updateCommunityService);
router.delete('/:id', deleteCommunityService);

export default router;
