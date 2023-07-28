import Order from "../models/Order.js"; // Import the order schema
import User from "../models/User.js"; // Import the user model
import Product from "../models/Products.js"; // Import the product model
import catchAsyncError from "../middlewares/catchAsync.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const placeOrder = catchAsyncError(async (req, res, next) => {
  // Extract necessary information from the request body
  const { userId, products, totalAmount, shippingAddress } = req.body;
  console.log(req.body);

  if (!userId || !products || !totalAmount || !shippingAddress)
    return next(
      new ErrorHandler("Please complete all the fields to place the Order")
    );

  // Create a new order document
  const order = await Order.create({
    userId,
    products,
    totalAmount,
    shippingAddress,
  });

  // Update the user's order history
  const user = await User.findById(userId);
  if (!user) return next(new ErrorHandler("user does not exiest", 404));

  await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

  // Update the stock quantity of products
  for (const product of products) {
    await Product.findByIdAndUpdate(product.productId, {
      $inc: { stock: -product.quantity },
    });
  }
  res.status(200).json({
    success: true,
    message: "Order placed successfully",
    order,
  });
});

export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) return next(new ErrorHandler("Order Does not exist", 404));

  if (order.isDelivered)
    return next(new ErrorHandler("cannot cancel a delivered order"));
  await Order.findByIdAndRemove(id);

  await User.findByIdAndUpdate(order.userId, { $pull: { orders: id } });

  for (const product of order.products) {
    await Product.findByIdAndUpdate(product.productId, {
      $inc: { stock: product.quantity },
    });
  }

  res.status(200).json({
    success: true,
    message: "Order canceled successfully",
  });
});

export const UpdateOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { products, totalAmount, shippingAddress } = req.body;

  // Find the order by ID
  const order = await Order.findById(id);

  if (!order) return next(new ErrorHandler("Order does not exist"));

  // Check if the order has already been delivered
  if (order.isDelivered)
    return next(new ErrorHandler("cannot edit a delivered product"));

  // Update the order details
  order.products = products;
  order.totalAmount = totalAmount;
  order.shippingAddress = shippingAddress;

  // Save the updated order to the database
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
  });
});

export const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  if (orders.length === 0) return next(new ErrorHandler("no orders"));
  res.status(200).json({
    success: true,
    orders,
  });
});

export const getOneOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return next(new ErrorHandler("Order does not exist", 401));
  }
  res.status(201).json({
    success: true,
    order,
  });
});
