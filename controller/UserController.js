import User from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import catchAsyncError from "../middlewares/catchAsync.js";
import { sendToken } from "../utils/JwtToken.js";
import { sendEmail } from "../utils/SendEmail.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;
  if (!name || !email || !password || !file)
    return next(new ErrorHandler("Please enter all fileds", 400));
  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("user Already exists", 409));
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });
  sendToken(res, user, "registered successfully");
});
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //   const file = req.file
  if (!email || !password)
    return next(new ErrorHandler("Please enter all fileds", 400));
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("user does not exist", 401));
  const isMatch = await user.comparePassword(password);

  if (!isMatch) return next(new ErrorHandler("invalid email or password"));
  sendToken(res, user, `welcome back$ ${user.name}`);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "successfully logged out",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("please enter all fields", 400));

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) return next(new ErrorHandler("incorrect Old Password", 400));
  user.password = newPassword;

  await user.save();
  res.status(200).json({
    success: true,
    message: "password changed successfully",
    user,
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email)
    return next(new ErrorHandler("please enter all fields", 400));

  const user = await User.findById(req.user._id);

  if (user) user.name = name;
  if (email) user.email = email;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile changed successfully",
  });
});

export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const file = req.file;
  if (!file)
    return next(new ErrorHandler("you have not selected any file", 400));
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: mycloud.public_id,
    url: mycloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "profile picture updated",
  });
});
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ErrorHandler("please enter all the fields"));

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("user not found", 400));

  const resetToken = user.getResetToken();

  await user.save();

  const url = `${process.env.FRONTEND_URL}resetpassword/${resetToken}`;

  const message = `Click on the link reset your password ${url} if you have not requestedd then simply ignore`;

  sendEmail(user.email, "CourseBundler Reset Password", message);
  res.status(200).json({
    success: true,
    message: `password reset token sent to ${user.email}`,
  });
});
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
  });

  if (!user)
    return next(new ErrorHandler("token is invalid or has been expired"));

  user.password = req.body.password;

  if (!req.body.password) return next(new ErrorHandler("Complete all feilds"));

  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    user,
    resetPasswordToken,
    message: "password reset successfull",
  });
});

export const updateUserRole = catchAsyncError(async (req, res, next) => {
  const { id, role } = req.body;
  if (!role) return next(new ErrorHandler("please enter the fields", 400));
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User does not exist", 409));
  user.role = role;
  await user.save();
  res.status(200).json({
    success: true,
    user,
    message: "User role updated successfully",
  });
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  if (users.length === 0) return next(new ErrorHandler("No user to show", 409));
  res.status(200).json({
    success: true,
    users,
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not found"));
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});
