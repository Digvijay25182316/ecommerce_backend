import express from "express";
import {
  changePassword,
  deleteUser,
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
import { authorizeAdmin, isAuthenticated } from "../middlewares/Auth.js";

import singleUpload from "../middlewares/Multer.js";

const router = express.Router();

//register
router.route("/register").post(singleUpload, register);
//login
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
  .put(singleUpload, isAuthenticated, updateProfilePicture);

//forgetPassword
router.route("/forgetpassword").post(forgetPassword);

//resetPassword
router.route("/resetpassword/:token").put(resetPassword);

// admin routes
router.route("/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/updaterole")
  .put(isAuthenticated, authorizeAdmin, updateUserRole);

router
  .route("/deleteuser/:id")
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
