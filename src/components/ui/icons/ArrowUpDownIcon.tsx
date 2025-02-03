import React from "react";
import Icon from "./Icon";

const ArrowUpDownIcon = ({
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
      <path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z" />{" "}
    </Icon>
  );
};

export default ArrowUpDownIcon;
