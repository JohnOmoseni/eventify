import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// refers to the global type of mongoose
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "eventify",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  console.log("Connected to MongoDB");
  return cached.conn;
};
