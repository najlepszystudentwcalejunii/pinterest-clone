import Comments from "../../components/comments/comments";
import PostInteractions from "../../components/PostInteractions/PostInteractions";
import "./PostPage.css";
import { Image } from "@imagekit/react";
import { Link } from "react-router";

const PostPage = () => {
  return (
    <div className="postPage">
      <img
        src="/general/leftArrow.svg"
        alt=""
        height={40}
        style={{ cursor: "pointer" }}
      />
      <div className="postContainer">
        <div className="postImg">
          <Image width={736} src={"/pins/pin1.jpeg"} />
        </div>
        <div className="postDetails">
          <PostInteractions />
          <Link to={"/john"} className="postUser">
            <Image src="/general/noAvatar.png" />
            <span>John Doe</span>
          </Link>
          <Comments />
        </div>
      </div>
    </div>
  );
};
export default PostPage;
