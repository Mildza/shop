import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "./../../shared/button/Button";
import CartContext from "./../../shared/context/CartContext";
import CartItem from "../cart-item/CartItem";
import "./CardDropdown.scss";

const CardDropdown = () => {
  const { cart, removeItem, cartVisible } = useContext(CartContext);
  const history = useHistory();

  const checkoutHandler = () => {
    history.push("/checkout");
    cartVisible();
  };

  return (
    <div className="cart-dropdown">
      <div className="card-items">
        {cart.length ? (
          cart.map(el => (
            <CartItem
              key={el.id}
              item={el}
              onClick={() => {
                removeItem(el);
              }}
            ></CartItem>
          ))
        ) : (
          <div className="empty-message">No items in cart</div>
        )}
      </div>
      <Button onClick={checkoutHandler}>Go to checkout</Button>
    </div>
  );
};

export default CardDropdown;
