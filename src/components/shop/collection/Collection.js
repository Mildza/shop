import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Collection.scss";

import ItemCollections from "./../itemCollections/ItemCollections";
import Category from "./../../homepage/category/Category";

const scrollToCollection = id => {
  const collection = document.getElementById(id);
  window.scrollTo(0, collection.offsetTop);
};

const Collection = ({ items, title, routeName }) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      scrollToCollection(id);
    }
  }, [id]);

  return (
    <div className="collection">
      {id === routeName ? <div id={routeName}></div> : null}
      <Link to={`/shop/${routeName}/all`}>
        <h1>{title.toUpperCase()} ...</h1>
      </Link>

      <div className="collection-row">
        {items
          .filter((item, i) => i < 4)
          .map(item => (
            <ItemCollections key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Collection;
