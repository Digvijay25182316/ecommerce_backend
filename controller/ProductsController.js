import catchAsyncError from "../middlewares/catchAsync.js";
import Product from "../models/Products.js";
import User from "../models/User.js";
import ApiFeatures from "../utils/apiFeatures.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 30;
  const productCount = await Product.countDocuments();
  if (productCount === 0)
    return next(new ErrorHandler("Products are yet to upload"));
  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// create new product --Admin
export const createProduct = catchAsyncError(async (req, res, next) => {
  const {
    name,
    price,
    description,
    category,
    quantity,
    brand,
    material,
    features,
  } = req.body;
  const file = req.file;
  if (!file) return next(new ErrorHandler("enter all fields"));
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  const product = await Product.create({
    name,
    price,
    description,
    category,
    quantity,
    brand,
    material,
    features,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "product created successfully",
    product,
  });
});

// only admin csn access this
export const updateProductPoster = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Images Start Here
  const file = req.file;
  if (!file) return next(new ErrorHandler("Please fill all fields"));
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  await cloudinary.v2.uploader.destroy(product.poster.public_id);

  product.poster = {
    public_id: mycloud.public_id,
    url: mycloud.secure_url,
  };

  await product.save();

  res.status(200).json({
    success: true,
    message: "poster updated successfully",
    product,
  });
});

export const updateProductDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("product not found"));
  product = await Product.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    success: true,
    message: "product details updated successfully",
    product,
  });
});

export const getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//deleteProduct --Admin
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  await cloudinary.v2.uploader.remove_all_context(product.poster.public_id);

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

//Create new review or update existing review

export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isreviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id
  );

  if (isreviewed) {
    product.reviews.forEach((rev) => {
      if ((rev) => rev.user.toString() === req.user._id) {
        (rav.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Thanks!! for the reviews",
  });
});

// Get All Reviews of a product
export const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
export const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "review deleted",
  });
});
