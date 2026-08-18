import express from 'express';
import { getTeamMembers, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember, stepReorderTeamMember } from '../controllers/teamController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getTeamMembers).post(protect, authorize('admin', 'faculty'), createTeamMember);
router.route('/reorder/:id').put(protect, authorize('admin', 'faculty'), stepReorderTeamMember);
router.route('/:id').get(getTeamMemberById).put(protect, authorize('admin', 'faculty'), updateTeamMember).delete(protect, authorize('admin', 'faculty'), deleteTeamMember);

export default router;
