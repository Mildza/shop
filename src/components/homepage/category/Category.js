import React from "react";
import { Link } from "react-router-dom";

import "./Category.scss";
const Category = props => {
  const { imageUrl, title, routeName, size } = props.data;

  return (
    <div className={`category ${size}`}>
      <div
        className="bg-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="content">
        <Link to={`/shop/${routeName}`}>
          <p className="title">{title}</p>
        </Link>
      </div>
    </div>
  );
};

export default Category;
