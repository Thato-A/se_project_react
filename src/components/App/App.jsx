import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  login,
  register,
  checkToken,
  updateProfile,
} from "../../utils/api.js";
import { checkAuth } from "../../utils/auth.js";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temp: { F: 999, C: 999 },
    city: " ",
    condition: " ",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  function handleModalOverlayClick(evt) {
    if (evt.target.classList.contains("modal")) {
      closeActiveModal();
    }
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItemModalSubmit = ({ itemName, imageUrl, weather }) => {
    return addItem({ "item-name": itemName, imageUrl, weather })
      .then((newItem) => {
        setIsLoading(true);
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteButtonClick = () => {
    setActiveModal("delete-modal");
  };

  const handleDeleteCard = () => {
    const token = localStorage.getItem("jwt");
    deleteItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUserData = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
        });
    }
  };

  const handleRegistration = ({ email, password, name, avatar }) => {
    setIsLoading(true);
    register({ email, password, name, avatar })
      .then((res) => {
        if (!res) {
          throw new Error("Sorry registration unsuccessful");
        }
        return login({ email, password }).then((loginRes) => {
          if (loginRes.token) {
            localStorage.setItem("jwt", loginRes.token);
            return checkToken(loginRes.token);
          }
          throw new Error("Token was not recieved after login");
        });
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          closeActiveModal();
          setErrorMessage("");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.message.includes("409")) {
          setErrorMessage("This email is already registered");
        } else if (err.message.includes("login")) {
          setErrorMessage(
            "Registration successful but login failed. Please try logging in."
          );
        } else {
          setErrorMessage(
            err.message || "Registration failed. Please try again."
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = ({ email, password }) => {
    return login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          checkToken(res.token).then((userData) => {
            console.log(userData);
            if (userData) {
              setCurrentUser(userData);
              setIsLoggedIn(true);
              closeActiveModal();
            }
          });
        }
      })
      .catch((err) => {
        setErrorMessage(err.message || "An error occurred");
        throw new Error(err);
      });
  };

  const handleUpdateProfile = (updatedData) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    updateProfile({
      ...updatedData,
      token,
    })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser("");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openRegistrationModal = () => {
    setActiveModal("register");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;
    const handleOverlayClickClose = (e) => {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };

    document.addEventListener("click", handleOverlayClickClose);

    return () => {
      document.removeEventListener("click", handleOverlayClickClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems();
    const token = localStorage.getItem("jwt");
    if (token) {
      checkAuth(token)
        .then((userData) => {
          if (userData) {
            setCurrentUser(userData);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("jwt");
            setIsLoggedIn(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="page">
          <div className="page__content">
            <Header
              onAddNewItem={handleAddClick}
              weatherData={weatherData}
              onLoginClick={openLoginModal}
              setErrorMessage={setErrorMessage}
              onRegisterClick={openRegistrationModal}
              onEditProfile={handleEditProfile}
              handleSignOut={handleSignOut}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    onAddNewItem={handleAddClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    currentUser={currentUser}
                    isLoggedIn={isLoggedIn}
                  />
                }
              ></Route>

              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                  >
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddNewItem={handleAddClick}
                      onCardLike={handleCardClick}
                      handleEditProfile={handleEditProfile}
                      handleSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
            onModalOverlayClick={handleModalOverlayClick}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onDeleteCard={handleDeleteCard}
            onDeleteButtonClick={handleDeleteButtonClick}
            currentUser={currentUser}
          />
          <DeleteModal
            isOpen={activeModal === "delete-modal"}
            onClose={closeActiveModal}
            onConfirm={handleDeleteCard}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onSubmit={handleRegistration}
            onClickLogin={openRegistrationModal}
            onClose={closeActiveModal}
            isLoading={isLoading}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onSubmit={handleLogin}
            onClickRegister={openLoginModal}
            onClose={closeActiveModal}
            isLoading={isLoading}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onSubmit={handleUpdateProfile}
            errorMessage={errorMessage}
            currentUser={currentUser}
          />
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
              <button onClick={() => setErrorMessage(null)}>&times;</button>
            </div>
          )}

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
