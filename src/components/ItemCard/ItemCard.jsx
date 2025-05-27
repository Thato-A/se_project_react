import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const token = localStorage.getItem("jwt");

  const handleImageClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item, isLiked);
  };

  const isLiked =
    Array.isArray(item.likes) &&
    item.likes.some((id) => id.toString() === currentUser?._id);

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        onClick={handleImageClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__content">
        {token && (
          <button
            type="button"
            className={`card__like-button ${
              isLiked ? "card__like-button_is-active" : ""
            }`}
            onClick={handleLike}
          ></button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
