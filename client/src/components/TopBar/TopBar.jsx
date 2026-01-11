import UserButton from "../UserButton/UserButton";
import "./TopBar.css";
import { useNavigate } from "react-router";

const TopBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?search=${e.target[0].value}`);
  };
  return (
    <div className="topBar">
      <div className="search">
        <form onSubmit={handleSubmit}>
          <img src="/general/search.svg" alt="" />
          <input type="text" placeholder="Search..." />
        </form>
      </div>
      <UserButton />
    </div>
  );
};
export default TopBar;
