import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/useFormAndValidation";

function RegisterModal({ isOpen, onClose, onSubmit, onClickLogin, isLoading }) {
  const { values, errors, handleChange, setErrors, setIsValid, resetForm } =
    useFormAndValidation({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Check if all fields have values and there are no errors
    if (
      Object.values(values).every((value) => value) &&
      Object.keys(errors).length === 0
    ) {
      onSubmit(values);
    } else {
      setIsValid(false);
      // Set errors for empty required fields
      const formErrors = {};
      Object.entries(values).forEach(([key, value]) => {
        if (!value) {
          formErrors[key] = "This field is required";
        }
      });
      setErrors(formErrors);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      secondaryButtonText={"or Login"}
      secondaryButtonAction={onClickLogin}
    >
      <label className="modal__label">
        Email*
        <input
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          maxLength="30"
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label className="modal__label">
        Password*
        <input
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          minLength="8"
          maxLength="30"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          title="Password must be at least 8 characters long and contain at least one letter and one number"
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      <label className="modal__label">
        Name*
        <input
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
          pattern="[A-Za-z\s-]+"
          title="Name should only contain letters, spaces, and hyphens"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label className="modal__label">
        Avatar URL*
        <input
          className={`modal__input ${
            errors.avatar ? "modal__input_error" : ""
          }`}
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          required
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
      <button type="submit" className="modal__add-button">
        Register
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
