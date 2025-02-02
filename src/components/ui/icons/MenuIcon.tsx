import React from "react";
import Icon from "./Icon";

const MenuIcon = ({
  size = 6,
  color = "#000",
  darkColor = "#fff",
  disabled = false,
  className = "",
}) => {
  return (
    <Icon size={size} color={color} darkColor={darkColor} disabled={disabled} className={className}>
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />{" "}
    </Icon>
  );
};

export default MenuIcon;
