import { useState, useCallback } from "react";

export function useFormAndValidation(inputValues = {}) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setIsValid(e.target.closest(".modal__form").checkValidity());

    // const error = validateField(name, value);
    // if (error) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     [name]: error,
    //   }));
    // } else {
    //   setErrors((prevErrors) => {
    //     const newErrors = { ...prevErrors };
    //     delete newErrors[name];
    //     return newErrors;
    //   });
    // }
  }, []);

  const resetForm = (
    newValues = inputValues,
    newErrors = {},
    newIsValid = false
  ) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  };

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  };
}
