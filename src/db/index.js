import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB CONNECTED !! DB HOST: ${connnectionInstance.connection.host} \n`);
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1); // this will terminate the node process if there is an error while connecting to the database
    }
}

export default connectDB;