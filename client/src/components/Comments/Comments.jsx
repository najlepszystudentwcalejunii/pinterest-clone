import { Image } from "@imagekit/react";
import "./Comments.css";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import { format } from "timeago.js";

const Comments = ({ id }) => {
  const [open, setOpen] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => api.get(`/comments/${id}`).then((res) => res.data),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Comments not found</p>;
  }
  if (error) {
    return <p>An error has occurred: {error.message}</p>;
  }
  console.log(data);

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
      <form className="commentForm">
        <input placeholder="Add a comment" type="text" />
        <div className="emoji's">
          <div onClick={() => setOpen((prev) => !prev)}>🥰</div>
          {open && (
            <div className="emojiPicker">
              <EmojiPicker />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default Comments;
