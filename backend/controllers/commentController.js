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
