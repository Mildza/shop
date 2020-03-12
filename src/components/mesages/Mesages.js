import React, { useContext } from "react";

import MessageContext from "../../shared/context/MessageContext";

import "./Mesages.scss";

const Mesages = () => {
  const { message, setMsg } = useContext(MessageContext);

  if (message.isMessage) {
    setTimeout(() => setMsg(), 3000);
  }

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
