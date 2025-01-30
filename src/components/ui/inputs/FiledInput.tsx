// components/Input.tsx
import { ErrorMessage } from "formik";
import React from "react";

type InputProps = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "email" | "password"; // Se puede extender a otros tipos de input si es necesario
  darkMode?: boolean; // Para aplicar el modo oscuro
};

const FiledInput: React.FC<InputProps> = ({
  id,
  label,
  name,
  placeholder = "",
  value,
  onChange,
  required = false,
  disabled = false,
  type = "text",
  darkMode = false,
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-medium ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className={`bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          darkMode ? "text-white" : "text-gray-900"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        {...props}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-2"
      />
    </div>
  );
};

export default FiledInput;
