import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.models.js";
import mongoose, { isValidObjectId } from "mongoose";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId, subscriberId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel Id");
  }

  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid user Id");
  }

  if (subscriberId.toString() === channelId.toString()) {
    throw new ApiError(400, "You cannot subscribe to yourself");
  }

  const existingSubscription = await Subscription.findOne({
    subscriber: subscriberId,
    channel: channelId,
  });

  if (existingSubscription) {
    await Subscription.deleteOne({ _id: existingSubscription._id });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Subscription removed successfully"));
  } else {
    const newSubscription = await Subscription.create({
      subscriber: subscriberId,
      channel: channelId,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, newSubscription, "Subscription added successfully")
      );
  }
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel Id");
  }

  const subscribers = (
    await Subscription.find({ channel: channelId }).populate(
      "subscriber",
      "username email"
    )
  ).map((sub) => sub.subscriber);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribers,
        "Channel subscribers fetched successfully"
      )
    );
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid subscriber Id");
  }

  const channels = (
    await Subscription.find({ subscriber: subscriberId }).populate(
      "channel",
      "username"
    )
  ).map((sub) => sub.channel);

  return res
    .status(200)
    .json(new ApiResponse(200, channels, "subscribers fetched successfully"));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
