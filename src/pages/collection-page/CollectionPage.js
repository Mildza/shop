import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import Products from "./../../components/shop/products/Products";

import DATA from "../../shared/data";
import "./CollectionPage.scss";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
};
const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth"
  });
};
const CollectionPage = () => {
  const { id } = useParams();
  useEffect(() => {
    setTimeout(function() {
      scrollToTop();
    }, 700);
    scrollToBottom();
  }, [id]);

  const catalog = DATA.filter(el => el.routeName === id);

  const items = catalog[0].items;

  return (
    <div className="collection-page">
      <Link to={`/shop/${id}`}>
        <h1>{`... ${id.toUpperCase()}`}</h1>
      </Link>

      <div className="list">
        {items.map(item => (
          <Products key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
