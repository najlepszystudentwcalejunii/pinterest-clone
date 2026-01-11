import express from "express";
import { getOnePin, getPins } from "../controllers/pinController.js";

const router = express.Router();

router.get("/", getPins);
router.get("/:id", getOnePin);

export default router;
