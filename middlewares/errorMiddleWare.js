import ErrorHandler from "../utils/errorHandler.js";

export const errorMiddleware = (err, req, res, next) => {
  let error = { ...err }; // Create a copy of the error object

  error.message = err.message || "Internal Server Error";
  error.statusCode = err.statusCode || 500;

  if (error.name === "CastError") {
    const message = `Resource not found. Invalid: ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(
      error.keyValue
    )} entered, user already exists`;
    error = new ErrorHandler(message, 400);
  }

  // JWT invalid
  if (error.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid";
    error = new ErrorHandler(message, 400);
  }

  // JWT expired
  if (error.name === "TokenExpiredError") {
    const message = "JSON Web Token has expired";
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
  });
};

export default errorMiddleware;
