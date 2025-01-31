import { ReactNode } from "react";

type IconProps = {
  size?: number; // Tamaño del icono, por defecto es 6 (1.5rem)
  color?: string; // Color del icono, por defecto es '#e8eaed'
  disabled?: boolean; // Si el icono está deshabilitado, por defecto es false
  className?: string; // Clases adicionales de Tailwind que puedas pasar
  children: ReactNode; // Definimos children como ReactNode
};

const Icon: React.FC<IconProps> = ({
  size = 6,
  color = "#000",
  disabled = false,
  className = "",
  children,
}) => {
  const iconClass = `${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;
  const iconSize = `w-${size} h-${size}`;

  return (
    <svg
      className={`${iconSize} ${iconClass}`}
      fill={color}
      viewBox="0 -960 960 960"
    >
      {children}
    </svg>
  );
};

export default Icon;
