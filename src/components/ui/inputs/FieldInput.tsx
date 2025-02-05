import React from "react";
import { Label } from "../shadcn/label";
import { Input } from "../shadcn/input";
import { cn } from "../../../lib/utils";

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
  darkMode?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

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
  type = "text",
  ...props
}: InputProps) {
  return (
    <div className={cn(className, "w-full")}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        className="bg-white dark:bg-gray-700"
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...props}
      />
      {helperText && (
        <Label className="text-xs text-red-600 dark:text-red-400">
          {helperText}
        </Label>
      )}
    </div>
  );
}

export default FieldInput;
