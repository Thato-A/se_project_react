import "./ModalWithForm.css";

function ModalWithForm({
  children,
  isLoading,
  title,
  isOpen,
  onClose,
  onSubmit,
  onModalOverlayClick,
}) {
  const buttonText = isLoading ? "Saving..." : "add-garment";

  return (
    <div
      onClick={onModalOverlayClick}
      className={`modal ${isOpen && "modal_open"}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__add-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
