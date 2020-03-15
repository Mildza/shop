import React from "react";

import "./ListCollection.scss";
import Collection from "../collection/Collection";
import DATA from "../../../shared/data";

const ListCollection = () => {
  return (
    <div className="list-collection">
      <h1>Categories</h1>
      {DATA.map(({ id, ...other }) => (
        <Collection key={id} {...other} />
      ))}
    </div>
  );
};

export default ListCollection;
