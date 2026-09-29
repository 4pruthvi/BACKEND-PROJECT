import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) => {
    // res.status(200).json({
    //     message : "Ok"
    // })

    // get user details from frontend
    // validation - not empty
    // check if user already exists : username,email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // ceate user object - create entry in db
    // remove password and referesh token field form response
    // check for user creation
    // return res

    const {fullName, email, userName, password} = req.body
    console.log("email:", email);

    //insted of using this if syntax multiple times for validation we use advanced syntax for validation
    // if (fullName === "") {
    //     throw new ApiError(400, "fullName is required")
    // }

    if (
        [fullName, email, userName, password].some((field) => 
        field?.trim() === "" )
    ) {
        throw new ApiError(400,"all fields are required")
    }
    

    const existedUser = User.findOne({
        $or: [{ userName }, { email }]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or userName already exists")
    }


    const avatarLoacalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLoacalPath) {
        throw new ApiError(400,"Avatar file is required")
    }


    const avatar = await uploadOnCloudinary(avatarLoacalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400,"Avatar file is required")
    }


    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "SOMETHING WENT WRONG WHILE REGISTERING THE USER")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export {registerUser}
