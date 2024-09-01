import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.info('Mongodb connected!')
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}