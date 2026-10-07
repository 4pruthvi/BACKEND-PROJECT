import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// here res is written as _
export const verifyJWT = asyncHandler(async(req, _ ,next) => {
    try {
        // console.log("COOKIES:", req.cookies);
        // console.log("AUTH HEADER:", req.header("Authorization"));

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token) {
            throw new ApiError(401, "Unathorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user) {
            throw new ApiError(401, "Inlavid access Token")
        }

        req.user = user;
        next()



    } catch (error) {
        throw new ApiError(401, error?.message || "Inlavid access token")
    }
})