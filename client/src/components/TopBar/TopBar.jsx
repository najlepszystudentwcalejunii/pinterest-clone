import UserButton from "../UserButton/UserButton";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topBar">
      <div className="search">
        <img src="/general/search.svg" alt="" />
        <input type="text" placeholder="Search..." />
      </div>
      <UserButton />
    </div>
  );
};
export default TopBar;
