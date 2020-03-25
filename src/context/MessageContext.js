import { createContext } from "react";

const MessageContext = createContext({
  message: { isMessage: false, text: "", status: "" },
  setMsg: () => {}
});

export default MessageContext;
