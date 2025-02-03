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
  darkMode?: boolean; // Para aplicar el modo oscuro
};

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
        className={cn(className, "mt-2")}
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
