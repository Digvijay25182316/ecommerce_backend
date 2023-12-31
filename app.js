import express from "express";
import errorMiddleWare from "./middlewares/errorMiddleWare.js";
import user from "./routes/UserRoute.js";
import product from "./routes/ProductRoute.js";
import payment from "./routes/PaymentRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import cart from "./routes/CartItemRoute.js";
import order from "./routes/OrderRoute.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Routes
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", payment);
app.use("/api/v1", cart);
app.use("/api/v1", order);

// middlewares
app.use(errorMiddleWare);

export default app;
