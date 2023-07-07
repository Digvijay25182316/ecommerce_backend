import express from "express";
import {
  changePassword,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controller/UserController.js";
import { isAuthenticated } from "../middlewares/Auth.js";

import singleUpload from "../middlewares/Multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/users").get(getAllUsers);

router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// Get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

// change password
router.route("/changepassword").put(isAuthenticated, changePassword);

// update password
router.route("/updateprofile").put(isAuthenticated, updateProfile);

//update profile Picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, updateProfilePicture);

//forgetPassword
router.route("/forgetpassword").post(forgetPassword);
//resetPassword
router.route("/resetpassword/:token").put(resetPassword);

// admin routes
router.route("/updaterole").put(updateUserRole);

export default router;
