import "./ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";

function ItemModal({
  activeModal,
  onClose,
  card,
  onDeleteCard,
  onDeleteButtonClick,
}) {
  console.log(card);
  return (
    <div className={`modal ${activeModal === "preview" && "modal_open"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__items">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              className="modal__delete-button"
              type="button"
              onClick={onDeleteButtonClick}
            >
              Delete Item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
