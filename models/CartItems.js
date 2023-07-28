import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // This should be the name of the related product model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields here as needed, such as userId to associate the cart items with a user, etc.
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
