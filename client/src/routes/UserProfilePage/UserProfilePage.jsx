import { useState } from "react";
import "./UserProfilePage.css";
import { Image } from "@imagekit/react";
import Collections from "../../components/Collections/Collections";
import Gallery from "../../components/Gallery/Gallery";

const UserProfilePage = () => {
  const [type, setType] = useState("saved");
  return (
    <div className="profilePage">
      <Image className="profileImg" src="/general/noAvatar.png" width={100} />
      <h1 className="profileName">John Doe</h1>
      <span className="profileUsername">@johnDoe</span>
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
      {type === "created" ? <Gallery /> : <Collections />}
    </div>
  );
};
export default UserProfilePage;
