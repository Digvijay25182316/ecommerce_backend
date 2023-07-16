import express from "express";
import {
  UpdateOrder,
  deleteOrder,
  getAllOrders,
  placeOrder,
} from "../controller/OrderController";
import { authorizeAdmin, isAuthenticated } from "../middlewares/Auth";

const router = express.Router();

router.route("/placeorder").post(isAuthenticated, placeOrder);
router.route("/deleteorder/:id").delete(isAuthenticated, deleteOrder);
router.route("/updateorder/:id").put(isAuthenticated, UpdateOrder);

router.route("/getorders").get(isAuthenticated, authorizeAdmin, getAllOrders);

export default router;
