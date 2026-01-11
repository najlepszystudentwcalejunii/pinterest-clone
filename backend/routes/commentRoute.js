import express from "express";
import { getPostComments } from "../controllers/commentController.js";

const router = express.Router();

router.get("/:postId", getPostComments);

export default router;
