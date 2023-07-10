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

//completed
router.route("/register").post(singleUpload, register);
//completed
router.route("/login").post(login);

// Logout         //completed
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
  .put(singleUpload, isAuthenticated, updateProfilePicture);

//forgetPassword
router.route("/forgetpassword").post(forgetPassword);
//resetPassword
router.route("/resetpassword/:token").put(resetPassword);

// admin routes
//incomplete
router.route("/users").get(getAllUsers);
router.route("/updaterole").put(updateUserRole);

export default router;
