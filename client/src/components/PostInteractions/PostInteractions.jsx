import { Image } from "@imagekit/react";
import "./PostInteractions.css";

const PostInteractions = () => {
  return (
    <div className="postInteractions">
      <div className="interactionsIcons">
        <Image src="./general/react.svg" />
        273
        <Image src="./general/share.svg" />
        <Image src="./general/more.svg" />
      </div>
      <button>Save</button>
    </div>
  );
};
export default PostInteractions;
