import React, { useContext } from "react";

import "./Products.scss";
import Button from "../../../shared/button/Button";
import CartContext from "../../../shared/context/CartContext";

const Products = ({ item }) => {
  const { addItem } = useContext(CartContext);

  const addItemToCart = () => {
    addItem(item);
  };

  return (
    <div className="products">
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

export default Products;
