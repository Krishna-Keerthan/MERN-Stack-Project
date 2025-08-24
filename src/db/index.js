import mongoose from "mongoose";
import { DBNAME } from "../constants.js";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`)
        console.log("MongoDB Connected successfully || DB_HOST : ",connectionInstance.connection.host);
       
    } catch (error) {
        console.error("MongoDB Connetion Failed : " , error);
        process.exit(1)
        
    }
}

export default connectDB;