import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweets.models.js";
import mongoose, { isValidObjectId } from "mongoose";

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const userId = req.user?._id;

  if (!content || typeof content !== "string") {
    throw new ApiError(400, "Tweet content is required and must be a string");
  }

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user Id");
  }

  const newTweet = await Tweet.create({
    content,
    owner: userId,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { tweets: newTweet._id },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newTweet, "Tweet created Successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user Id");
  }

  const tweets = await Tweet.find({ owner: userId }).sort({ createdAt: -1 });

  return res
    .status(201)
    .json(new ApiResponse(201, tweets, "Users Tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { content } = req.body;
  const tweetId = req.params.id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user Id");
  }

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid Tweet Id");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(400, "Tweet not found");
  }

  if (tweet.owner.toString() !== userId.toString()) {
    throw new ApiError(400, "You are not authorized to update the tweet");
  }

  if (content !== undefined) {
    tweet.content = content;
  }
  await tweet.save();

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const tweetId = req.params.id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user Id");
  }

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid Tweet Id");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(400, "Tweet not found");
  }

  if (tweet.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this tweet");
  }

  await tweet.deleteOne();

  await User.findByIdAndUpdate(userId, {
    $pull: { tweets: tweetId },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
