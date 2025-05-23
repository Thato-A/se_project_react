import { useState } from "react";

export default function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { value, name } = event.target;

    setValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
    if (value.trim() === "") {
      setErrors({ ...errors, [name]: "This field is required" });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, handleChange, setValues, setErrors, resetForm };
}
