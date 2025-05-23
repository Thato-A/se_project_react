import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import Logo from "../../assets/header-logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";

function Header({
  weatherData,
  onLoginClick,
  onRegisterClick,
  onAddNewItem,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={Logo} alt="wtwr-logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <nav className="header__nav">
        {isLoggedIn ? (
          <ul className="header__nav-container">
            <ToggleSwitch />
            <li>
              <button
                onClick={onAddNewItem}
                type="button"
                className="header__add-clothes-btn"
              >
                {" "}
                + Add clothes
              </button>
            </li>

            <li>
              <Link to="/profile" className="header__link">
                {currentUser.name}
                <button className="header__user-btn">
                  {currentUser.avatar ? (
                    <img
                      className="header__avatar"
                      src={currentUser.avatar}
                      alt="user-avatar"
                    />
                  ) : (
                    <span className="header__avatar header__avatar-none">
                      {currentUser.name?.toUpperCase().charAt(0) || ""}
                    </span>
                  )}
                </button>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="header__nav-container">
            <ToggleSwitch />

            <li>
              <button onClick={onRegisterClick} className="header__sign-btn">
                Sign Up
              </button>
            </li>
            <li>
              <button onClick={onLoginClick} className="header__sign-btn">
                Log In
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
