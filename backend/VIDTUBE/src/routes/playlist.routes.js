import { Router } from "express";
import {
  addVideoToPlaylist,
  createPlaylist,
  getPlaylistById,
  getUserPlaylists,
  removePlaylist,
  removeVideoFromPlaylist,
  updatePlaylist,
} from "../controllers/playlist.controllers";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(createPlaylist);
router.route("/user/:userId").get(getUserPlaylists);
router.route("/:playlistId").get(getPlaylistById);
router.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);
router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);
router.route("/:playlistId").delete(removePlaylist);
router.route("/:playlistId").patch(updatePlaylist);

export default router;
