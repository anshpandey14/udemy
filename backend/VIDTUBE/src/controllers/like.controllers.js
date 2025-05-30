import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.models.js";
import mongoose, { isValidObjectId } from "mongoose";

const toggleLike = async ({ userId, targetId, field }) => {
  const filter = {
    likedBy: userId,
    tweet: null,
    video: null,
    comment: null,
  };
  filter[field] = targetId;

  const existingLike = await Like.findOne(filter);

  if (existingLike) {
    await existingLike.deleteOne();
    return { liked: false };
  } else {
    filter.likedBy = userId;
    await Like.create(filter);
    return { liked: true };
  }
};

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video Id");
  }

  const result = await toggleLike({
    userId: req.user._id,
    targetId: videoId,
    field: "video",
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        `Video ${result.liked ? "liked" : "unliked"} successfully`
      )
    );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment Id");
  }

  const result = await toggleLike({
    userId: req.user._id,
    targetId: commentId,
    field: "comment",
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        `Comment ${result.liked ? "liked" : "unliked"} successfully`
      )
    );
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet Id");
  }

  const result = await toggleLike({
    userId: req.user._id,
    targetId: tweetId,
    field: "tweet",
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        `Tweet ${result.liked ? "liked" : "unliked"} successfully`
      )
    );
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const likes = await Like.find({
    likedBy: req.user._id,
    video: { $ne: null },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, likes, "Liked videos fetched successfully"));
});

export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos };
