import express from "express";
import {
  UpdateOrder,
  deleteOrder,
  getAllOrders,
  getOneOrder,
  placeOrder,
} from "../controller/OrderController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

router.route("/placeorder").post(isAuthenticated, placeOrder);
router.route("/deleteorder/:id").delete(isAuthenticated, deleteOrder);
router.route("/updateorder/:id").put(isAuthenticated, UpdateOrder);
router.route("/getOrder/:id").get(isAuthenticated, getOneOrder);

router.route("/getorders").get(isAuthenticated, authorizeAdmin, getAllOrders);

export default router;
