import React, { useContext } from "react";

import { CartContext } from "../../providers/CartProvider";

import "./CheckoutItem.scss";

const CheckoutItem = ({ data }) => {
  const { increaseQuantity, removeItem, decreaseQuantity } = useContext(
    CartContext
  );
  const { name, price, imageUrl, quantity } = data;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <span className="description">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => decreaseQuantity(data)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => increaseQuantity(data)}>
          &#10095;
        </div>
      </span>
      <span className="price">&euro;{price}</span>
      <div className="remove" onClick={() => removeItem(data)}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
