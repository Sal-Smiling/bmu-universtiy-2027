import express from 'express';
import { getSettings, getSettingByKey, upsertSetting, deleteSetting } from '../controllers/settingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getSettings).post(protect, authorize('admin', 'faculty'), upsertSetting);
router.route('/:key').get(getSettingByKey).delete(protect, authorize('admin', 'faculty'), deleteSetting);

export default router;
