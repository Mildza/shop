import React, { useContext } from "react";

import bag from "./bag.png";

import "./CartIcon.scss";
import CartContext from "./../../context/CartContext";

const CartIcon = props => {
  const { cart } = useContext(CartContext);
  console.log(cart);

  return (
    <div className="cart-icon" onClick={props.onClick}>
      <img src={bag} className="shopping-icon" alt="Logo" />
      <span className="item-count">{cart.length}</span>
    </div>
  );
};

export default CartIcon;
