import { Image } from "@imagekit/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { format } from "timeago.js";
import api from "../../api/api";
import "./Boards.css";

const Boards = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => api.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Board not found</p>;
  }
  if (error) {
    return <p>An error has occurred: {error.message}</p>;
  }

  return (
    <div className="collections">
      {data.map((board) => (
        <Link
          key={board._id}
          className="collection"
          to={`/search?boardId=${board._id}`}
        >
          <Image src={board.firstPin.media} />
          <div className="collectionInfo">
            <h1>{board.title}</h1>
            <span>
              {board.pinCount} pins - {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default Boards;
