import { Image } from "@imagekit/react";
import "./Comments.css";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

const Comments = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="comments">
      <div className="commentList">
        <div className="comment">
          <Image src="/general/noAvatar.png" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
              quae? Officia modi quia, voluptate a doloribus repellendus
              incidunt dicta ut asperiores ad dolorum, eveniet at. Recusandae
              mollitia tempore dolore culpa?
            </p>
            <span className="commentTime">1h</span>
          </div>
        </div>
        <div className="comment">
          <Image src="/general/noAvatar.png" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
              quae? Officia modi quia, voluptate a doloribus repellendus
              incidunt dicta ut asperiores ad dolorum, eveniet at. Recusandae
              mollitia tempore dolore culpa?
            </p>
            <span className="commentTime">1h</span>
          </div>
        </div>
        <div className="comment">
          <Image src="/general/noAvatar.png" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
              quae? Officia modi quia, voluptate a doloribus repellendus
              incidunt dicta ut asperiores ad dolorum, eveniet at. Recusandae
              mollitia tempore dolore culpa?
            </p>
            <span className="commentTime">1h</span>
          </div>
        </div>
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
