import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`Connected to ${conn.connection.host}`);
    }catch(err){
        console.log("MongoDB connection error:", err);
    }
}

export default connectDB;