import React from "react";

import "./Button.scss";

const Button = ({ children, inverted, ...props }) => {
  return (
    <button
      className={`custom-button ${inverted ? "inverted" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
