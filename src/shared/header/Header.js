import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import UserContext from "./../context/UserContext";
import CartContext from "./../context/CartContext";
import { auth } from "./../../firebase/firabase-util";

import "./Header.scss";
import CartIcon from "./cart-icon/CartIcon";
import CardDropdown from "./../../components/card-dropdown/CardDropdown";

const IMAGE_PATH = process.env.PUBLIC_URL + "/assets/images/";

const Header = props => {
  const { openCart, cartVisible } = useContext(CartContext);
  const { user, logHandler } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const toggleCart = () => {
    cartVisible();
  };

  const logOut = () => {
    auth.signOut();
    logHandler();
    setToggle(false);
  };

  return (
    <nav className="header">
      <Link className="logo" to="/">
        HOME
      </Link>
      <div className="right-side">
        <div className="links">
          <Link to="/shop">SHOP</Link>

          <CartIcon onClick={toggleCart} />

          {user ? (
            <div className="log-out">
              <div className="wrapper" onClick={toggleHandler}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    title={user.displayName}
                  />
                ) : (
                  <img
                    src={IMAGE_PATH + "defaultuser.png"}
                    alt={user.displayName}
                    title={user.displayName}
                  />
                )}
                {toggle && (
                  <div className="log-button">
                    <button onClick={logOut}>LogOut</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}
        </div>
      </div>
      {openCart && <CardDropdown />}
    </nav>
  );
};

export default Header;
