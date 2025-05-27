import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useFormAndValidation } from "../../utils/useFormAndValidation.js";

function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
  isLoading,
  onModalOverlayClick,
}) {
  const { values, handleChange, setErrors, errors, isValid, resetForm } =
    useFormAndValidation({
      name: "",
      imageUrl: "",
      weather: "",
    });

  const isFormValid = () => {
    const newErrors = { ...errors };
    if (!values.weather) {
      newErrors.weather = "Please select weather type";
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      onAddItemModalSubmit({ ...values, token: localStorage.getItem("jwt") });
      resetForm();
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onModalOverlayClick={onModalOverlayClick}
    >
      <label htmlFor="item-name" className="modal__label">
        Item name{" "}
        <input
          type="text"
          className="modal__input"
          id="item-name"
          name="name"
          placeholder="Item name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values[name]}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          placeholder="ImageUrl"
          name="imageUrl"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type :</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weather"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "hot"}
            value="hot"
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weather"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "warm"}
            value="warm"
          />{" "}
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weather"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "cold"}
            value="cold"
          />{" "}
          Cold
        </label>
        {errors.weather && (
          <span className="radio-group__error">{errors.weather}</span>
        )}
      </fieldset>
      <button type="submit" className="modal__add-button">
        Add garment
      </button>
    </ModalWithForm>
  );
}

export default AddItemModal;
