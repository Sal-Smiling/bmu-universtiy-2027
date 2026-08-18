import express from 'express';
import { submitApplication, getApplicationStatus } from '../controllers/applicationController.js';

const router = express.Router();

router.route('/').post(submitApplication);
router.route('/status/:applicationId').get(getApplicationStatus);

export default router;
