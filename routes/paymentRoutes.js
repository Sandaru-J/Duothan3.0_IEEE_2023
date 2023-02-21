import express from 'express';
import { confirmPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.route('/').post(confirmPayment).get(confirmPayment);

export default router;
