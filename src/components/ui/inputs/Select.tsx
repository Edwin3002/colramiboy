"use client";

import { ReactNode } from "react";
import { Label } from "../shadcn/label";

type SelectProps = {
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
  visiblity?: "block" | "invisible";
  darkMode?: boolean; // Para aplicar el modo oscuro
  optionLabel?: string;
  optionValue?: string;
  children?: ReactNode;
  options?: [] & React.SelectHTMLAttributes<HTMLSelectElement>;
};
const Select: React.FC<SelectProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  helperText = "",
  visiblity = "block",
  darkMode = false,
  options = [],
  optionLabel = "",
  optionValue = "",
  className = "",
  placeholder = "Selecciona una opción",
  children = null,
  ...props
}) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        name={name}
        className={`${className} bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ${visiblity} w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          darkMode ? "text-white" : "text-gray-900"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""} `}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        {...props}
      >
        <option value="">{placeholder}</option>
        {children
          ? children
          : options?.map((item, i) => (
              <option
                key={
                  item
                    ? i + item
                    : i + item?.[optionLabel] + item?.[optionValue]
                }
                value={item || item?.[optionValue]}
              >
                {item || item?.[optionLabel]}
              </option>
            ))}
      </select>
      {helperText && (
        <Label className="text-xs text-red-600 dark:text-red-400">
          {helperText}
        </Label>
      )}
    </div>
  );
};
export default Select;
