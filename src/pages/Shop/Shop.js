import React, { useEffect } from "react";

import AllProducts from "../../components/shop/all-products/AllProducts";
import "./Shop.scss";

import DATA from "./../../shared/data";
import {
  firestore,
  conertCollectionsSnapshotToMap
} from "../../firebase/firabase-util";

const Shop = () => {
  useEffect(() => {
    const collectionRef = firestore.collection("collection");
    collectionRef.onSnapshot(async snapshot =>
      conertCollectionsSnapshotToMap(snapshot)
    );
  }, []);

  return (
    <div className="shop">
      <h1>Categories</h1>
      {DATA.map(({ id, ...other }) => (
        <AllProducts key={id} {...other} />
      ))}
    </div>
  );
};

export default Shop;
