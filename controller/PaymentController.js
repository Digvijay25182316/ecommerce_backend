import stripePackage from "stripe";
import catchAsyncError from "../middlewares/catchAsync.js";
import ErrorHandler from "../utils/ErrorHandler.js";
const stripe = new stripePackage(process.env.CLIENT_SECRET); // Replace with

export const processPayment = catchAsyncError(async (req, res, next) => {
  const { amount } = req.body;
  if (!amount) {
    return next(new ErrorHandler("Enter all the fields"));
  }
  const myPayment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    metadata: {
      company: "veda's creation",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
