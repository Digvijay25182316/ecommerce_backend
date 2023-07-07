import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myapp";
const connectDB = () => {
  mongoose
    .connect(MONGO_URI)
    .then(({ connection }) =>
      console.log(`db is connected to ${connection.host}`)
    );
};

export default connectDB;
