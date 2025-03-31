import "./AddItemModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useState } from "react";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
    setName("");
    setImageUrl("");
    setWeather("");
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          placeholder="ImageUrl"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
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
            onChange={handleWeatherChange}
            checked={weather === "hot"}
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
            onChange={handleWeatherChange}
            checked={weather === "warm"}
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
            onChange={handleWeatherChange}
            checked={weather === "cold"}
            value="cold"
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
