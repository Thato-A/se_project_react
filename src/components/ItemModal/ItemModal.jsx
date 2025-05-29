import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Modal } from "../Modal/Modal";
import "./ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";

function ItemModal({ isOpen, onClose, card, onDeleteButtonClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  return (
    <Modal isOpen={isOpen} type={"image"} onClose={onClose}>
      {/* <div className="modal__content modal__content_type_image"> */}
      <button onClick={onClose} type="button" className="modal__close"></button>
      <img src={card.imageUrl} alt={card.name} className="modal__image" />
      <div className="modal__footer">
        <div className="modal__items">
          <h2 className="modal__caption">{card.name}</h2>
          {isOwn && (
            <button
              className="modal__delete-button"
              type="button"
              onClick={onDeleteButtonClick}
            >
              Delete Item
            </button>
          )}
        </div>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
      {/* </div> */}
    </Modal>
  );
}

export default ItemModal;
