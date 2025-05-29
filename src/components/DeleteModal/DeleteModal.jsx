import "./DeleteModal.css";
import CloseBtn from "../../assets/close-button.svg";

function DeleteModal({ isOpen, onClose, onConfirm, isLoading }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-delete">
      <div className="modal-delete__content">
        <button type="button" className="modal-delete__close" onClick={onClose}>
          <img src={CloseBtn} alt="close-button" />
        </button>
        <p className="modal-delete__warning">
          Are you sure you want to delete this item? This action is irreversible
        </p>
        <div className="modal-delete__buttons">
          <button
            type="button"
            className="modal-delete__button modal-delete__button-confirm"
            onClick={onConfirm}
          >
            {isLoading ? "Deleting..." : "Yes, delete this item"}
          </button>

          <button
            type="button"
            className="modal-delete__button modal-delete__button-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
