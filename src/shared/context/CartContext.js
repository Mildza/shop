import { createContext } from "react";

const CartContext = createContext({
  cart: [],
  addItem: () => {},
  removeItem: () => {}
});

export default CartContext;
