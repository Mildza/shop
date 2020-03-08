import React, { useContext } from "react";

import "./CardDropdown.scss";
import Button from "./../../shared/button/Button";
import CartContext from "./../../shared/context/CartContext";

const CardDropdown = () => {
  const { cart, removeItem } = useContext(CartContext);
  console.log(cart);

  const removeItemFromCart = item => {
    removeItem(item);
  };

  return (
    <div className="cart-dropdown">
      <div className="card-items">
        {cart.length ? (
          cart.map(el => (
            <h4
              onClick={() => {
                removeItemFromCart(el);
              }}
            >
              {el.name}
            </h4>
          ))
        ) : (
          <h4>No items in cart</h4>
        )}
      </div>
      <Button>Go to checkout</Button>
    </div>
  );
};

export default CardDropdown;
