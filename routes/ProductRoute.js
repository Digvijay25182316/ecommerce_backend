import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getProductDetails,
  getProductReviews,
  updateProductDetails,
  updateProductPoster,
} from "../controller/ProductsController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/Multer.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/createproduct")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeAdmin, singleUpload, updateProductPoster)
  .delete(isAuthenticated, authorizeAdmin, deleteProduct);

router
  .route("/admin/productupdate/:id")
  .put(isAuthenticated, authorizeAdmin, updateProductDetails);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticated, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticated, deleteReview);
export default router;
