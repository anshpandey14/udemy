import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { comment } from "../models/comment.models.js";
import mongoose, { isValidObjectId } from "mongoose";

const addComment = asyncHandler(async(req, res)=>{
    const UserId = req.params;
    const {content} = req.body;
}) 