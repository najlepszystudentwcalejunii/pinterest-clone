import jwt from "jsonwebtoken";
import Comment from "../models/commentModel.js";

export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({
    pin: postId,
  })
    .sort({ createdAt: -1 })
    .populate("user", "displayName img");
  return res.status(200).json(comments);
};

export const addComment = async (req, res) => {
  const { description, postId } = req.body;

  const userId = req.userId;

  const comment = await Comment.create({
    description,
    pin: postId,
    user: userId,
  });

  res.status(201).json({ comment });
};
