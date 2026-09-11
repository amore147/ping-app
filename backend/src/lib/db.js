import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const mongo_url = process.env.MONGO_URL;

    if (!mongo_url) throw new Error("MONGO_URL is required");

    const conn = await mongoose.connect(mongo_url);
    console.log("Db Connected", conn.connection.host);
  } catch (err) {
    console.log("MongoDB connection error");
    process.exit(1);
  }
};


