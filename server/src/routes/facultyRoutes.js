import express from 'express';
import {
  getFaculties,
  createFaculty,
  updateFaculty,
  deleteFaculty
} from '../controllers/facultyController.js';

const router = express.Router();

router.route('/')
  .get(getFaculties)
  .post(createFaculty);

router.route('/:id')
  .put(updateFaculty)
  .delete(deleteFaculty);

export default router;
