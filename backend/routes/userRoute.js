import express from "express";
import { test } from "../controllers/userController.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const userInformation = req.body;
    const hashedPassword = await bcrypt.hash(userInformation.password, 10);
    const newUser = await User.create({
      ...userInformation,
      hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err?.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export default router;
