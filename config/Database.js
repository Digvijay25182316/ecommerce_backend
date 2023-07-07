import mongoose from "mongoose";
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(({ connection }) =>
      console.log(`db is connected to ${connection.host}`)
    );
};

export default connectDB;
