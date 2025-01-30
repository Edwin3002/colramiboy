// components/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined";
  color?: "blue" | "red" | "green"; // Puedes extenderlo a otros colores si lo deseas
  size?: "sm" | "md" | "lg"; // Tamaños del botón (pequeño, mediano, grande)
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  color = "blue",
  size = "sm",
  children,
  disabled = false,
  ...props
}) => {
  // Clases comunes
  const baseClasses =
    "font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none";

  // Variantes para el color
  const colorClasses = {
    blue: {
      contained:
        "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      outlined:
        "border border-blue-700 text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800",
    },
    red: {
      contained:
        "bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
      outlined:
        "border border-red-700 text-red-700 hover:bg-red-800 hover:text-white focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-500 dark:focus:ring-red-800",
    },
    green: {
      contained:
        "bg-green-700 text-white hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
      outlined:
        "border border-green-700 text-green-700 hover:bg-green-800 hover:text-white focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:focus:ring-green-800",
    },
  };

  // Tamaños del botón
  const sizeClasses = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  // Definir las clases finales
  const buttonClasses = `${baseClasses} ${colorClasses[color][variant]} ${
    sizeClasses[size]
  } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
