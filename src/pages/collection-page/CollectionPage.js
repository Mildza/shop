import React from "react";

import { useParams, Link } from "react-router-dom";

import ItemCollections from "./../../components/shop/itemCollections/ItemCollections";

import DATA from "../../shared/data";
import "./CollectionPage.scss";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
};
const CollectionPage = () => {
  scrollToTop();
  const { id } = useParams();

  const catalog = DATA.filter(el => el.routeName === id);

  const items = catalog[0].items;

  return (
    <div className="collection-page">
      <Link to={`/shop/${id}`}>
        <h1>{`... ${id.toUpperCase()}`}</h1>
      </Link>

      <div className="list">
        {items.map(item => (
          <ItemCollections key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;