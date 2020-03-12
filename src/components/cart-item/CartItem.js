import React from "react";

import "./CartItem.scss";

const CartItem = ({ item: { name, price, quantity, imageUrl }, onClick }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={imageUrl} alt="" />
      </div>
      <div className="cart-item-details">
        <p>{name}</p>
        <p>
          {quantity} x &euro;{price}
        </p>
      </div>
      <div className="remove">
        <span onClick={onClick}>&#10005;</span>
      </div>
    </div>
  );
};

export default CartItem;
