import React, { useState, useContext, useEffect } from "react";

import { useHistory } from "react-router-dom";

import CartContext from "./../../shared/context/CartContext";
import CheckoutItem from "./../../components/checkout-item/CheckoutItem";
import "./Checkout.scss";

import { cartTotal } from "./../../shared/utils/cartUtils";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [currentCart, setCurrentCart] = useState(cartTotal(cart));
  const history = useHistory();

  useEffect(() => {
    setCurrentCart(cartTotal(cart));
  }, [cart]);
  return (
    <>
      {currentCart ? (
        <div className="checkout">
          <div className="checkout-header">
            <div className="header-block">
              <span>product</span>
            </div>
            <div className="header-block">
              <span>description</span>
            </div>
            <div className="header-block">
              <span>qauntity</span>
            </div>
            <div className="header-block">
              <span>price</span>
            </div>
            <div className="header-block">
              <span>remove</span>
            </div>
          </div>
          {cart.map(item => (
            <CheckoutItem key={item.id} data={item} />
          ))}
          <div className="total">
            <span>TOTAL: &euro; {cartTotal(cart)}</span>
          </div>
        </div>
      ) : (
        history.push("/shop")
      )}
    </>
  );
};

export default Checkout;
