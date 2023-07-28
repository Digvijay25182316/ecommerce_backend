import catchAsyncError from "../middlewares/catchAsync.js";
import CartItem from "../models/CartItems.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// Controller function to add a new cart item
export const createCartItem = catchAsyncError(async (req, res, next) => {
  const { productId, quantity, price } = req.body;
  console.log(productId, quantity, price);
  if (!productId || !quantity || !price) {
    return next(new ErrorHandler("Please enter all the fields", 409));
  }
  const cartItem = await CartItem.create({
    productId,
    quantity,
    price,
  });
  res.status(201).json({
    success: true,
    message: "Added to cart successfully",
    cartItem,
  });
});

// Controller function to get all cart items
export const getAllCartItems = catchAsyncError(async (req, res, next) => {
  const cartItems = await CartItem.find();
  if (!cartItems) return next(new ErrorHandler("Your Cart is empty", 404));
  res.status(201).json({
    success: true,
    cartItems,
  });
});

// Controller function to get a specific cart item by its ID
export const getCartItemById = catchAsyncError(async (req, res, next) => {
  const cartItem = await CartItem.findById(req.params.id);
  if (!cartItem) return next(new ErrorHandler("Cart item not found", 404));
  res.status(200).json({
    success: true,
    cartItem,
  });
});

// Controller function to delete a specific cart item by its ID
export const deleteCartItem = catchAsyncError(async (req, res, next) => {
  const cartItem = await CartItem.findByIdAndDelete(req.params.id);
  if (!cartItem) return next(new ErrorHandler("Cart item not found", 404));

  res.status(200).json({
    success: true,
    message: "Cart item deleted successfully",
  });
});
