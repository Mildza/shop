import React, { useState, useEffect } from "react";
import { Router, Route } from "react-router-dom";

import Header from "./shared/header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Shop from "./pages/Shop/Shop";
import CollectionPage from "./pages/collection-page/CollectionPage";
import LogIn from "./pages/login/LogIn";
import Messages from "./components/mesages/Mesages";
import Checkout from "./pages/checkout/Checkout";

import { auth, createUserProfile } from "./firebase/firabase-util";
import UserContext from "./context/UserContext";

import "./App.scss";

import { createBrowserHistory } from "history";
const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

const App = () => {
  const [user, setUser] = useState();

  const logHandler = () => {
    setUser(null);
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
          <Header />
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/home">
            <Homepage />
          </Route>
          <Route exact path="/shop/:id/all">
            <CollectionPage />
          </Route>
          <Route exact path="/shop/:id">
            <Shop />
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route path="/LogIn">
            <LogIn />
          </Route>
        </UserContext.Provider>
        <Messages />
      </Router>
    </div>
  );
};

export default App;
