import React, { useContext } from "react";

import "./ItemCollections.scss";
import Button from "./../../../shared/button/Button";
import CartContext from "./../../../shared/context/CartContext";

const ItemCollections = ({ name, price, imageUrl }) => {
  const { addItem } = useContext(CartContext);

  const addItemToCart = () => {
    addItem({ name: name });
  };

  return (
    <div className="item-collection">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="item-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button inverted onClick={addItemToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ItemCollections;
