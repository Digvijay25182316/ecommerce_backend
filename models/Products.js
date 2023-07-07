import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  quantity: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
  },
  material: {
    type: String,
  },
  features: {
    type: [String],
  },
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        require: true,
      },
      rating: {
        type: Number,
        require: true,
      },
      comment: {
        type: String,
        require: true,
      },
    },
  ],
  createdBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
