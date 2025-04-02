import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../utils/useForm.js";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit, isLoading }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit(values)
      .then(() => {
        setValues({
          name: "",
          imageUrl: "",
          weather: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ModalWithForm
      title="New garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name} //value
        />
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
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
