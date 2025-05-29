import { Modal } from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({ children, title, name, onClose, onSubmit, isOpen }) {
  return (
    <Modal name={name} onClose={onClose} isOpen={isOpen}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose} />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </Modal>
  );
}

export default ModalWithForm;
