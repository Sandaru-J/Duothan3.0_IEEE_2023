import express from 'express';
import {
  createMedicine,
  deleteMedicine,
  getMedicine,
  getMedicines,
  updateMedicine,
} from '../controllers/medicineController.js';

const router = express.Router();

router.route('/').post(createMedicine).get(getMedicines);

router
  .route('/:id')
  .get(getMedicine)
  .patch(updateMedicine)
  .delete(deleteMedicine);

export default router;
