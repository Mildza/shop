import React from "react";

import "./Homepage.scss";
import MainCategory from "../../components/homepage/mainCategory/MainCategory";

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>Web Shop</h1>
      <MainCategory />
    </div>
  );
};

export default Homepage;
