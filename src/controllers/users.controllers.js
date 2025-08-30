import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadFileOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async ( req , res )=>{
    
    // get user details from frontend
    // Validation -EG: not empty
    // check if user already exists: username , email 
    // check for image , check for avatar
    // upload them to cloudinary -- avatar
    // create user obj -- create entry in db
    // remove  password and refresh token field from response
    // check for user creation
    // return res

    const {fullName , username , email ,password} = req.body

    console.log(email);
    

    if ([fullName , username , email , password ].some((field)=> field.trim() === "")){
        throw new ApiError(400 , "All Fields are required")
    }

    const existingUser = await User.findOne({
        $or: [email , username]
    }
    )

    if (existingUser){
        throw new ApiError(409 , "The User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0].path;
    const coverImageLocalPath = req.field?.coverimage[0].path;

    if (!avatarLocalPath){
        throw new ApiError(400 , "Avatar file is required")
    }

    const avatar = await uploadFileOnCloudinary(avatarLocalPath);
    const coverImage = await uploadFileOnCloudinary(coverImageLocalPath);

    if (!avatar) {
    throw new ApiError(400 , "Avatar file is required")    }

    const user = await User.create({
        fullName,
        username : username.toLowerCase(),
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
    }
    )

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (createdUser) {
        throw new ApiError(500 , "Something went wrong while creating the user")
    }

    return res.status(201).json(
        new ApiResponse(200 , "User Registered Successfully")
    )
})

export {
    registerUser,
}