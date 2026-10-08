import mongoose from 'mongoose';
import { config } from './config.js';

const connectDB = async () => {
    const mongoUri = config.MONGO_URI;

    if(!mongoUri){
        throw new Error("Mongo uri is not defined in environment variable.");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected....");
}

export default connectDB;