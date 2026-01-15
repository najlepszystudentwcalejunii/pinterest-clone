import express from "express";
import {
  createUser,
  getOneUser,
  getUsers,
  loginUser,
  logoutUser,
  followUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/follow/:userName", verifyToken, followUser);

router.get("/:userName", getOneUser);

export default router;
