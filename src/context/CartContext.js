import { createContext } from "react";

const CartContext = createContext({
  cart: [],
  counter: 0,
  openCart: false,
  cartVisible: () => {},
  addItem: () => {},
  removeItem: () => {},
  decreaseQuantity: () => {},
  increaseQuantity: () => {}
});

export default CartContext;
