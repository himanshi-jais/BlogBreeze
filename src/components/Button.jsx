import React from "react";

function Button({
  children, // Add children prop here
  btnText,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "",
  className = "",
  ...props
}) {
  return (
    <button className={`${className} ${bgColor} ${textColor}`} {...props}>
      {btnText || children} {/* Render either btnText or children */}
    </button>
  );
}

export default Button;
