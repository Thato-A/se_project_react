import "./Header.css";
import Logo from "../../assets/header-logo.svg";
import Avatar from "../../assets/header-avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="wtwr-logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__nav">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          {" "}
          + Add clothes
        </button>

        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            {Avatar ? (
              <img
                className="header__avatar"
                src={Avatar || AvatarDefault}
                alt="user-avatar"
              />
            ) : (
              <span className="header__avatar header__avatar-none">
                {username?.toUpperCase().charAt(0) || ""}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
