import mongoose from "mongoose";
import { config } from "dotenv";
config({path : '.env'})

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
        console.log("db connected successfully");
    } catch (err) {
        console.log("db connect error" , err);
    }
}