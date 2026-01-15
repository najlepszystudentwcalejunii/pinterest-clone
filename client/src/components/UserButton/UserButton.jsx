import { useState } from "react";
import "./UserButton.css";
import api from "../../api/api";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";

const UserButton = () => {
  const { currentUser, removeCurrentUser } = useAuthStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await api.get("/users/logout");
    removeCurrentUser();
    navigate("/auth");
  };

  return currentUser ? (
    <div className="userButton" onClick={() => setOpen((prev) => !prev)}>
      <img src={currentUser.img || "/general/noAvatar.png"} alt="" />
      <div>
        <img src="/general/arrow.svg" className="arrow" />
      </div>
      {open && (
        <div className="userOptions">
          <Link to={`/${currentUser.userName}`} className="userOption">
            Profile
          </Link>
          <div className="userOption">Settings</div>
          <div className="userOption" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/auth" className="loginLink">
      Login / Sign Up
    </Link>
  );
};
export default UserButton;
