
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createOrder, deleteOrder, getAllOrders, updateOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createOrder);
router.get('/getall', verifyToken, getAllOrders);
router.put('/update/:orderId', verifyToken, updateOrder);
router.delete('/delete/:orderId', verifyToken, deleteOrder);

export default router;