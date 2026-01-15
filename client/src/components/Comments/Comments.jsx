import { Image } from "@imagekit/react";
import "./Comments.css";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { format } from "timeago.js";

const addComment = async (comment) => {
  const res = await api.post("/comments", comment);
  return res.data;
};

const Comments = ({ id }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => api.get(`/comments/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });
      setDesc("");
      setOpen(false);
    },
  });

  const handleEmojiClick = (emoji) => {
    setDesc((prev) => prev + emoji.emoji);
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({
      description: desc,
      postId: id,
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Comments not found</p>;
  }
  if (error) {
    return <p>An error has occurred: {error.message}</p>;
  }

  return (
    <div className="comments">
      <div className="commentList">
        <span className="commentCount">{data.length} Comments</span>
        {data.map((comment) => (
          <div key={comment._id} className="comment">
            <Image src={comment.user.img || "/general/noAvatar.png"} />
            <div className="commentContent">
              <span className="commentUsername">
                {comment.user.displayName}
              </span>
              <p className="commentText">{comment.description}</p>
              <span className="commentTime">{format(comment.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
      <form className="commentForm" onSubmit={handleSubmit}>
        <input
          placeholder="Add a comment"
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <div className="emoji">
          <div onClick={() => setOpen((prev) => !prev)}>🥰</div>
          {open && (
            <div className="emojiPicker">
              <EmojiPicker onEmojiClick={handleEmojiClick} className="z" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default Comments;
