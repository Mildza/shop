import React from "react";

import "./ItemCollections.scss";

const ItemCollections = ({ name, price, imageUrl }) => {
  return (
    <div className="item-collection">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="item-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
    </div>
  );
};

export default ItemCollections;
