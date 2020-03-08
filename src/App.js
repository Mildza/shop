import React, { useState, useEffect } from "react";
import { Router, Route } from "react-router-dom";

import Header from "./shared/header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Shop from "./pages/Shop/Shop";
import LogIn from "./pages/login/LogIn";

import { auth, createUserProfile } from "./firebase/firabase-util";
import UserContext from "./shared/context/UserContext";
import CartContext from "./shared/context/CartContext";

import { createBrowserHistory } from "history";
import "./App.scss";

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

function App() {
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);

  const logHandler = () => {
    setUser(null);
  };

  const addItem = item => {
    setCart(cart.concat(item));
  };
  const removeItem = item => {
    setCart(cart.filter(el => el !== item));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfile(user);
        userRef.onSnapshot(snapShot => {
          setUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      <Router history={history}>
        <UserContext.Provider value={{ user, logHandler }}>
          <CartContext.Provider value={{ cart, addItem, removeItem }}>
            <Header />
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/home">
              <Homepage />
            </Route>
            <Route path="/shop/:id">
              <Shop />
            </Route>
            <Route exact path="/shop">
              <Shop />
            </Route>
            <Route path="/LogIn">
              <LogIn />
            </Route>
          </CartContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
