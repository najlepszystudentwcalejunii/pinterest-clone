import express from "express";
import {
  getOnePin,
  getPins,
  createPin,
  interactionCheck,
  interact,
} from "../controllers/pinController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getPins);
router.get("/:id", getOnePin);
router.post("/", verifyToken, createPin);
router.get("/interaction-check/:id", interactionCheck);
router.post("/interact/:id", verifyToken, interact);

export default router;
