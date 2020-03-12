import React, { useContext } from "react";

import "./ItemCollections.scss";
import Button from "./../../../shared/button/Button";
import CartContext from "./../../../shared/context/CartContext";

const ItemCollections = ({ item }) => {
  const { addItem } = useContext(CartContext);

  const addItemToCart = () => {
    addItem(item);
  };

  return (
    <div className="item-collection">
      <div
        className="image"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      />
      <div className="item-footer">
        <span className="name">{item.name}</span>
        <span className="price">&euro;{item.price}</span>
      </div>
      <Button inverted onClick={addItemToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ItemCollections;
