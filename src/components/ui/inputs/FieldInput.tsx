import React from "react";
import { Label } from "../shadcn/label";
import { Input } from "../shadcn/input";

type InputProps = {
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
  visibility?: "block" | "invisible";
  type?: "text" | "email" | "password" | "number"; // Se puede extender a otros tipos de input si es necesario
  darkMode?: boolean; // Para aplicar el modo oscuro
};

// const FieldInput: React.FC<InputProps> = ({
//   id,
//   label,
//   name,
//   placeholder = "",
//   value,
//   onChange,
//   required = false,
//   disabled = false,
//   helperText = "",
//   visibility = "block",
//   type = "text",
//   darkMode = false,
//   className = "",
//   ...props
// }) => {
//   return (
//     <div>
//       <label
//         htmlFor={id}
//         className={`block mb-2 text-sm font-medium ${
//           darkMode ? "text-white" : "text-gray-900"
//         }`}
//       >
//         {label}
//       </label>
//       <input
//         type={type}
//         id={id}
//         name={name}
//         className={`${className} bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ${visibility} w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
//           darkMode ? "text-white" : "text-gray-900"
//         } ${disabled ? "opacity-50 cursor-not-allowed" : ""} `}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         required={required}
//         disabled={disabled}
//         {...props}
//       />
//       {Boolean(helperText) && (
//         <p
//           id="filled_error_help"
//           className="mt-2 text-xs text-red-600 dark:text-red-400"
//         >
//           {helperText}
//         </p>
//       )}
//     </div>
//   );
// };

export function FieldInput({
  id = "email",
  label = "",
  name = "",
  value = "",
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  helperText,
  className,
  visibility = "block",
  type = "text",
  ...props
}: InputProps) {
  return (
    <div
      className={`grid w-full max-w-sm items-center ${
        visibility === "invisible" ? "invisible" : "block"
      }`}
    >
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={className}
        {...props}
      />
      {helperText && (
        <Label className="mt-2 text-xs text-red-600 dark:text-red-400">
          {helperText}
        </Label>
      )}
    </div>
  );
}

export default FieldInput;
