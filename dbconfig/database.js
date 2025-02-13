import  mongoose  from "mongoose";
import dotenv from 'dotenv';
dotenv.config();






export const connectDB = async (cb) => {
  const DATABASE_URL =
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DB_URI
      : process.env.DATABASE_URL;

  try {
    mongoose
      .connect(DATABASE_URL, {
        socketTimeoutMS: 30 * 1000,
      })
      .then(() => {
        console.log("Database connected successfully.");
        if (cb) cb(); // Execute the callback if provided
      });
    console.log(`Connected to ${process.env.NODE_ENV} database`);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
};

export default connectDB;
