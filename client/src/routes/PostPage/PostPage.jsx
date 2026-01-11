import Comments from "../../components/Comments/Comments";
import PostInteractions from "../../components/PostInteractions/PostInteractions";
import "./PostPage.css";
import { Image } from "@imagekit/react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

const PostPage = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["pin"],
    queryFn: () => api.get(`/pins/${id}`).then((res) => res.data),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Pin not found</p>;
  }
  if (error) {
    return <p>An error has occurred: {error.message}</p>;
  }

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
          <Image width={736} src={data.media} />
        </div>
        <div className="postDetails">
          <PostInteractions />
          <Link to={`/${data.user.userName}`} className="postUser">
            <Image src={data.user.img || "/general/noAvatar.png"} />
            <span>{data.user.displayName}</span>
          </Link>
          <Comments id={data._id} />
        </div>
      </div>
    </div>
  );
};
export default PostPage;
