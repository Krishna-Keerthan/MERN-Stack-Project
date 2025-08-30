import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const VideoSchema = new Schema({
    videoFile:{
        type: String,
        required : true
    },
    thumbnail:{
        type:String,
        required: true,
    },
    title:{
        type: String,
        required : true,
    },
    description:{
        type:String , 
        required : true
    },
    duration: {
        type: Number,
        required : true 
    },
    views  : {
        type: Number,
        default : 0,
    },
    isPublished: {
        type : Boolean,
        default : true
    }

    },
    {
        timestamps:true
    }
)



export const VideoModel = mongoose.model("Video", VideoSchema)