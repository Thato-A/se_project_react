import "./SideBar.css";
import Avatar from "../../assets/header-avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={Avatar} alt="Default avatar" className="sidebar__image" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
