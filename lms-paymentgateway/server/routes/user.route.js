import express from "express";
import {
  signOutUser,
  authenticateUser,
  createUserAccount,
  getCurrentUserProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

// auth routes
router.post("/signup", createUserAc count);
router.post("/signin", authenticateUser);
router.post("/signout", signOutUser);

// profile routes
router.post("/profile", isAuthenticated, getCurrentUserProfile);

export default router;
