import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./AllProducts.scss";

import Products from "./../products/Products";

const scrollToProducts = id => {
  const routeProducts = document.getElementById(id);
  window.scrollTo(0, routeProducts.offsetTop);
};

const AllProducts = ({ items, title, routeName }) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      scrollToProducts(id);
    }
  }, [id]);

  return (
    <div className="collection">
      {id === routeName ? <div id={routeName}></div> : null}
      <Link to={`/shop/${routeName}/all`}>
        <h1>{title.toUpperCase()} ...</h1>
      </Link>

      <div className="all-products-row">
        {items
          .filter((item, i) => i < 4)
          .map(item => (
            <Products key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
