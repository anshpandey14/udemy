import { Router } from "express";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(createTweet);
router.route("/user").get(getUserTweets);
router.route("/:tweetId").delete(deleteTweet);
router.route("/:tweetId").patch(updateTweet);

export default router;
