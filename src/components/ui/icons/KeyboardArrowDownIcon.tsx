import React from "react";
import Icon from "./Icon";

const KeyboardArrowDownIcon = ({
  size = 6,
  color = "#000",
  darkColor = "#fff",
  disabled = false,
  className = "",
}) => {
  return (
    <Icon
      size={size}
      color={color}
      darkColor={darkColor}
      disabled={disabled}
      className={className}
    >
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />{" "}
    </Icon>
  );
};

export default KeyboardArrowDownIcon;
