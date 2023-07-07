import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/User.js";
import catchAsyncError from "./catchAsync.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new ErrorHandler("Not logged in", 401));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
});
export const authorizeAdmin = catchAsyncError(async (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resourse`,
        403
      )
    );
  next();
});
