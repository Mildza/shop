import React, { useState, useEffect } from "react";
import { Router, Route } from "react-router-dom";

import Header from "./shared/header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Shop from "./pages/Shop/Shop";
import LogIn from "./pages/login/LogIn";

import { auth, createUserProfile } from "./firebase/firabase-util";
import UserContext from "./shared/context/UserContext";

import { createBrowserHistory } from "history";
import "./App.scss";

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

function App() {
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
          <Route path="/shop/:id">
            <Shop />
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route path="/LogIn">
            <LogIn />
          </Route>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
