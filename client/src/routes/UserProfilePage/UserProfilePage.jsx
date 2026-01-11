import { useState } from "react";
import "./UserProfilePage.css";
import { Image } from "@imagekit/react";
import Boards from "../../components/Boards/Boards";
import Gallery from "../../components/Gallery/Gallery";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

const UserProfilePage = () => {
  const [type, setType] = useState("saved");

  const { userName } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.get(`/users/${userName}`).then((res) => res.data),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>User not found</p>;
  }
  if (error) {
    return <p>An error has occurred: {error.message}</p>;
  }

  return (
    <div className="profilePage">
      <Image
        className="profileImg"
        src={data.img || "/general/noAvatar.png"}
        width={100}
      />
      <h1 className="profileName">{data.displayName}</h1>
      <span className="profileUsername">@{data.userName}</span>
      <div className="followCounts">10 followers - 20 followings</div>
      <div className="profileInteractions">
        <Image src="/general/share.svg" />
        <div className="profileButtons">
          <button>Message</button>
          <button>Follow</button>
        </div>
        <Image src="/general/more.svg" />
      </div>
      <div className="profileOptions">
        <span
          onClick={() => setType("created")}
          className={type === "created" ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setType("saved")}
          className={type === "saved" ? "active" : ""}
        >
          Saved
        </span>
      </div>
      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Boards userId={data._id} />
      )}
    </div>
  );
};
export default UserProfilePage;
