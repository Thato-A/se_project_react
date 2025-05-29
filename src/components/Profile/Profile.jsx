import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  onAddNewItem,
  handleEditProfile,
  handleSignOut,
  onCardDelete,
  onCardLike,
  onCardRemoveLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
          currentUser={currentUser}
        />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddNewItem={onAddNewItem}
          onCardDelete={onCardDelete}
          onCardLike={onCardLike}
          onCardRemoveLike={onCardRemoveLike}
        />
      </section>
    </div>
  );
}

export default Profile;
