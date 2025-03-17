import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
/** STEPS FOR REGISTERING USERS 
 * get user details from frontend
 * validation - not empty
 * check if user already exist : username, email
 * check for image , check for avatar 
 * upload them to cloudinary , avatar 
 * create user object - create entry in db 
 * remove password and refresh token field from response 
 * check for user creation
 * return res
 */
  const{fullname,email,username,password}=req.body
  console.log("email:" , email);

if ([fullname,email,username,password].some((field)=>
field?.trim()===""))
 {
    throw new ApiError(400,"Please fill in all fields");
}
//checking user is already registered or not 
const existedUser = User.findOne({
    $or:[{username}, {email}]
})

if (existedUser) {
    throw new ApiError(409, "Username or email already exists");
}

 const avatarLocalPath = req.files?.avatar[0]?.path;
 const coverImagePath = req.files?.coverImage[0]?.path;

 if (!avatarLocalPath) {
    throw new ApiError(400, "Please upload a profile picture");
 }

 //uploading image to cloudinary
 const avatar = await uploadOnCloudinary(avatarLocalPath);
 const coverImage = await uploadOnCloudinary(coverImagePath);

 if (!avatar) {
    throw new ApiError(400, "Failed to upload profile picture");   
 }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password,
 })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken "
  )

  if(!createdUser){
    throw new ApiError(404, "something went wrong when registring an user .");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser,"User Registered Successfully")
  )
})

export { registerUser };