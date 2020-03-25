import React, { createContext, useState, useEffect } from "react";

import { cartChecker, cartCounter } from "../shared/utils/cartUtils";

const localState = JSON.parse(localStorage.getItem("cart"));
const localCounter = JSON.parse(localStorage.getItem("counter"));

export const CartContext = createContext({
  cart: [],
  counter: 0,
  openCart: false,
  message: { isMessage: false, text: "", status: "" },
  cartVisible: () => {},
  addItem: () => {},
  removeItem: () => {},
  decreaseQuantity: () => {},
  increaseQuantity: () => {},
  setMsg: () => {}
});

const CartProvider = ({ children }) => {
  //
  const [openCart, setOpenCart] = useState(false);
  const [cart, setCart] = useState(localState || []);
  const [counter, setCounter] = useState(localCounter || 0);
  const [message, setMessage] = useState({
    isMessage: false,
    text: "",
    status: ""
  });

  const cartVisible = () => {
    setOpenCart(!openCart);
  };

  const addItem = item => {
    const currentCart = cartChecker(cart, item);
    setCart(currentCart);
    setCounter(cartCounter(currentCart));
    setMessage({
      ...message,
      isMessage: true,
      text: `${item.name} added to the basket`,
      status: "added"
    });
  };
  const removeItem = item => {
    const currentCart = cart.filter(el => el !== item);
    setCart(currentCart);
    setCounter(cartCounter(currentCart));
    setMessage({
      ...message,
      isMessage: true,
      text: `${item.name} removed from the basket`,
      status: "removed"
    });
  };

  const increaseQuantity = item => {
    const currentCart = cartChecker(cart, item);
    setCart(currentCart);
    setCounter(cartCounter(currentCart));
  };

  const decreaseQuantity = item => {
    if (item.quantity >= 2) {
      const currentItem = { ...item, quantity: item.quantity - 1 };
      // const currentCart = cart.filter(el => el.id !== currentItem.id);
      const newCart = cart.map(el => {
        if (el.id === currentItem.id) {
          return { ...el, quantity: currentItem.quantity };
        } else {
          return el;
        }
      });
      setCart(newCart);
      setCounter(cartCounter(newCart));
    }
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("counter", JSON.stringify(counter));
  }, [cart, counter]);

  const setMsg = () => {
    setMessage({
      ...message,
      isMessage: false,
      text: "",
      status: ""
    });
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        counter,
        openCart,
        message,
        cartVisible,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        setMsg
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
