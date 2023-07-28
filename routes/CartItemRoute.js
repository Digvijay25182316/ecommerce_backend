import express from "express";
import {
  getCartItemById,
  deleteCartItem,
  createCartItem,
  getAllCartItems,
} from "../controller/CartItemsController.js";
import { isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();
// Route to add a new cart item
router.route("/addtocart").post(isAuthenticated, createCartItem);

// Route to get all cart items
router.route("/getcartitems").get(isAuthenticated, getAllCartItems);

// Route to get a specific cart item by its ID
router
  .route("/getcartitem/:id")
  .get(isAuthenticated, getCartItemById)
  .delete(isAuthenticated, deleteCartItem);

export default router;
