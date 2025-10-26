import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectDB = async () => {
  try {
    const mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
    
    const conn = await mongoose.connect(mongoUri, {
      dbName: "ai_resume_builder",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Memory Server Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    throw new ApiError(500, "Database connection failed", [], err.stack);
  }
};

export { connectDB };
