import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ handleEditProfile, handleSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          src={currentUser.avatar}
          alt="Default avatar"
          className="sidebar__image"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>

      <button
        type="button"
        onClick={handleEditProfile}
        className="sidebar__button"
      >
        Change profile data
      </button>
      <button type="button" onClick={handleSignOut} className="sidebar__button">
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
