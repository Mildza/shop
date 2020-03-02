import React from "react";

import "./MainCategory.scss";
import Category from "../category/Category";
import HOME_DATA from "../../../shared/homeData.js";

const MainCategory = () => {
  return (
    <div className="main">
      {HOME_DATA.map(data => (
        <Category key={data.id} data={data} />
      ))}
    </div>
  );
};

export default MainCategory;
