import React, { useEffect, useState } from "react";

import AllProducts from "../../components/shop/all-products/AllProducts";
import "./Shop.scss";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firabase-util";

const Shop = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const collectionRef = firestore.collection("collection");
    collectionRef.onSnapshot(async snapshot => {
      const temp = convertCollectionsSnapshotToMap(snapshot);
      setData(Object.keys(temp).map(item => temp[item]));
    });
  }, []);

  return (
    <div className="shop">
      <h1>Categories</h1>

      {data &&
        data.map(({ id, ...other }) => <AllProducts key={id} {...other} />)}
    </div>
  );
};

export default Shop;
