import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Playlist } from "../models/playlist.models.js";
import mongoose, { isValidObjectId } from "mongoose";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    throw new ApiError(400, "Name and description are required");
  }

  const newPlaylist = await Playlist.create({
    name,
    description,
    owner: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newPlaylist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user Id");
  }

  const playlists = await Playlist.find({
    owner: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, playlists, "Playlist fetched successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist Id");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist Id");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video Id");
  }

  if (playlist.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You do not have permission to modify this playlist"
    );
  }

  if (playlist.videos.includes(videoId)) {
    throw new ApiError(400, "Video has been already added");
  }

  playlist.videos.push(videoId);
  await playlist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Video added to playlist"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist Id");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video Id");
  }

  if (playlist.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You do not have permission to modify this playlist"
    );
  }

  playlist.videos = playlist.videos.filter(
    (id) => id.toString() !== videoId.toString()
  );

  await playlist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Video removed from playlist"));
});

const removePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist Id");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  if (playlist.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You do not have permission to modify this playlist"
    );
  }

  await Playlist.findByIdAndDelete(playlistId);

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist Deleted Successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist Id");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  if (!name && !description) {
    throw new ApiError(400, "Atleast one of Name and description are required");
  }

  if (playlist.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You do not have permission to modify this playlist"
    );
  }

  if (name) playlist.name = name;
  if (description) playlist.description = description;

  await playlist.save();
  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist update Successfully"));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  removePlaylist,
  updatePlaylist,
};
