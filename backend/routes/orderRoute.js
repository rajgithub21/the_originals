import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from "../middleware/auth.js";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyrazorpay,
} from "../controllers/orderController.js";


const orderRouter=express.Router();
//ADMIN FEATURES
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status', adminAuth,updateStatus);

//Payment features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

//User Feature
orderRouter.post("/userorders", authUser, userOrders);
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/verifyRazorpay", authUser, verifyrazorpay);


export default orderRouter




