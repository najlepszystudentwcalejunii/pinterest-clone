import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: "pinterest",
    });
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
  }
};

export default connectDB;
