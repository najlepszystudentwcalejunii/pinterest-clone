import express from "express";
import {
  createUser,
  getOneUser,
  getUsers,
} from "../controllers/userController.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/create", createUser);

router.get("/", getUsers);

router.get("/:userName", getOneUser);

export default router;
