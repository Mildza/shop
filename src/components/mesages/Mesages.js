import React, { useContext, useEffect } from "react";

import { CartContext } from "../../providers/CartProvider";
import "./Mesages.scss";

const Mesages = () => {
  const { message, setMsg } = useContext(CartContext);

  useEffect(() => {
    const timer = () => setTimeout(() => setMsg(), 2000);
    const timerId = timer();
    return () => {
      clearTimeout(timerId);
    };
  });

  return message.isMessage ? (
    message.status === "added" ? (
      <div className="message ">
        <div className="content success">{message.text}</div>
      </div>
    ) : (
      <div className="message ">
        <div className="content error">{message.text}</div>
      </div>
    )
  ) : null;
};

export default Mesages;
