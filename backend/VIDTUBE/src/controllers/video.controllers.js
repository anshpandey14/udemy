import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.models.js";
import mongoose, { isValidObjectId } from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

  const match = {
    ...(query && { title: { $regex: query, $options: "i" } }),
    ...(userId && { owner: userId }),
  };

  if (!userId) {
    match.isPublished = true;
  }

  const sort = sortBy
    ? { [sortBy]: sortType === "asc" ? 1 : -1 }
    : { createdAt: -1 };

  const aggregate = Video.aggregate([{ $match: match }, { $sort: sort }]);

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;

  const options = {
    page: pageNum,
    limit: limitNum,
    populate: { path: "owner", select: "username email" },
  };

  const result = await Video.aggregatePaginate(aggregate, options);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Videos Fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

  if (!title || !description) {
    throw new ApiError(400, " Title and description are required");
  }

  if (!videoFileLocalPath || !thumbnailLocalPath) {
    throw new ApiError(400, "Video and thumbnail are required");
  }

  const videoUpload = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnailUpload = await uploadOnCloudinary(thumbnailLocalPath);

  if (!videoUpload?.url || !thumbnailUpload?.url) {
    throw new ApiError(500, "Cloud upload failed");
  }

  if (!videoUpload?.url || !thumbnailUpload?.url) {
    if (videoUpload?.public_id)
      await deleteFromCloudinary(videoUpload.public_id);
    if (thumbnailUpload?.public_id)
      await deleteFromCloudinary(thumbnailUpload.public_id);
    throw new ApiError(500, "Cloud upload failed");
  }


  if (videoUpload.resource_type !== "video") {
    throw new ApiError(400, "Uploaded file is not a video");
  }

  const video = await Video.create({
    title,
    description,
    videoFile: videoUpload?.url,
    thumbnail: thumbnailUpload?.url,
    duration: videoUpload.duration,
    owner: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video uploaded successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }

  const video = await Video.findById(videoId).populate(
    "owner",
    "username email"
  );

  if (!video) {
    throw new ApiError(400, "Video not found");
  }

  if (
    !video.isPublished &&
    video.owner._id.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "Video is not published");
  }

  video.views += 1;
  await video.save();

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(400, "Video not found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "You are not allowed to update the video");
  }

  let newThumbnailUrl = video.thumbnail;
  if (req.files?.thumbnail?.[0]?.path) {
    const uploadResult = await uploadOnCloudinary(req.files.thumbnail[0].path);
    newThumbnailUrl = uploadResult.url || newThumbnailUrl;
  }

  video.title = title;
  video.description = description;
  video.thumbnail = newThumbnailUrl;
  await video.save();

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(400, "Video not found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "You are not allowed to delete the video");
  }

  await video.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(400, "Video not found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "Unauthorized");
  }

  video.isPublished = !video.isPublished;

  await video.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        video,
        `Video ${video.isPublished ? "published" : "unpublished"} successfully`
      )
    );
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
