import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONOGDB_URI_TASK);
        console.log(`Connected to mongodb, host: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in connecting mongodb: ${error}`);
    }
}