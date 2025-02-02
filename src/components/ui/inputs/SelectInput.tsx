import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import React from "react";

type SelectProps = {
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (e: string) => void;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
  visibility?: "block" | "invisible";
  darkMode?: boolean; // Para aplicar el modo oscuro
  optionLabel?: string;
  optionValue?: string;
  options: [];
};

// const SelectInput: React.FC<SelectProps> = ({
//   id,
//   label,
//   name,
//   value,
//   onChange,
//   required = false,
//   disabled = false,
//   helperText = "",
//   visiblity = "block",
//   darkMode = false,
//   options = [],
//   optionLabel = "",
//   optionValue = "",
//   className = "",
//   placeholder = "Selecciona una opción",
//   ...props
// }) => {
//   return (
//     <div>
//       <label
//         htmlFor={id}
//         className={`block mb-2 text-sm font-medium${
//           darkMode ? "text-white" : "text-gray-900"
//         }`}
//       >
//         {label}
//       </label>
//       <select
//         id={id}
//         name={name}
//         className={`${className} bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ${visiblity} w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
//           darkMode ? "text-white" : "text-gray-900"
//         } ${disabled ? "opacity-50 cursor-not-allowed" : ""} `}
//         value={value}
//         onChange={onChange}
//         required={required}
//         disabled={disabled}
//         {...props}
//       >
//         <option value="" selected>
//           {placeholder}
//         </option>
//         {options.map((item, i) => (
//           <option
//             key={
//               item ? i + item : i + item?.[optionLabel] + item?.[optionValue]
//             }
//             value={item || item?.[optionValue]}
//           >
//             {item || item?.[optionLabel]}
//           </option>
//         ))}
//       </select>
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

export function SelectInput({
  value = "",
  onChange,
  placeholder = "Select a timezone",
  helperText = "",
  className,
  darkMode = false,
  disabled = false,
  visibility = "block",
  options = [],
  optionLabel = "",
  optionValue = "",
}: SelectProps) {
  return (
    <div
      className={`w-full max-w-sm bg-orange-300${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } ${visibility === "invisible" ? "invisible" : "block"} ${className} mb-6 mt-8 bg-orange-300`}
    >
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((item, i) => (
              <SelectItem
                key={
                  item
                    ? i + item
                    : i + item?.[optionLabel] + item?.[optionValue]
                }
                value={item || item?.[optionValue]}
              >
                {item || item?.[optionLabel]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {helperText && (
        <Label className="mt-2 text-xs text-red-600 dark:text-red-400">
          {helperText}
        </Label>
      )}
    </div>
  );
}

export default SelectInput;
