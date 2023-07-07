import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../controller/PaymentController.js";
import { isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

router.route("/payment/process").post(isAuthenticated, processPayment);
router.route("/stripesecretkey").post(isAuthenticated, sendStripeApiKey);

export default router;
