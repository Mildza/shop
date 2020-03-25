import React, { useContext } from "react";

import bag from "./bag.png";

import "./CartIcon.scss";
import { CartContext } from "../../../providers/CartProvider";

const CartIcon = props => {
  const { counter } = useContext(CartContext);

  return (
    <div className="cart-icon" onClick={props.onClick}>
      <img src={bag} className="shopping-icon" alt="Logo" />
      <span className="item-count">{counter}</span>
    </div>
  );
};

export default CartIcon;
