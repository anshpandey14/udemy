import Router from "express";
import {
  addcomment,
  getUserComments,
  deleteComment,
} from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT);

router.route("/:videoId").post(addcomment);
router.route("/:videoId").get(getUserComments);
router.route("/:commentId").delete(deleteComment);
router.route("/:commentId").patch(updateComment);

export default router;
