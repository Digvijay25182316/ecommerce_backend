import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter your name"],
  },
  email: {
    type: String,
    required: [true, "enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "password must be atleast 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  paymentHistory: [
    {
      paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  orders: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() * 15 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", userSchema);

export default User;
