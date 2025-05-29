import { useEffect } from "react";

export const Modal = ({ onClose, children, isOpen, type }) => {
  useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOverlay}
    >
      <div
        className={`modal__content ${
          type === "image" ? "modal__content_type_image" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};
