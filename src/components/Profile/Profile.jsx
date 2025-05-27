import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  onAddNewItem,
  currentUser,
  handleEditProfile,
  handleSignOut,
  onCardDelete,
  onCardLike,
  onCardRemoveLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          currentUser={currentUser}
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
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
