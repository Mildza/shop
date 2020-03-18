import React, { useState, useEffect } from "react";
import { Router, Route } from "react-router-dom";

import Header from "./shared/header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Shop from "./pages/Shop/Shop";
import CollectionPage from "./pages/collection-page/CollectionPage";
import LogIn from "./pages/login/LogIn";
import Messages from "./components/mesages/Mesages";
import Checkout from "./pages/checkout/Checkout";

import {
  auth,
  createUserProfile,
  addCollectionAndDocuments
} from "./firebase/firabase-util";
import UserContext from "./shared/context/UserContext";
import CartContext from "./shared/context/CartContext";
import MessageContext from "./shared/context/MessageContext";
import DATA from "./shared/data";

import "./App.scss";

import { cartChecker, cartCounter } from "./shared/utils/cartUtils";

import { createBrowserHistory } from "history";
const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

const localState = JSON.parse(localStorage.getItem("cart"));
const localCounter = JSON.parse(localStorage.getItem("counter"));

function App() {
  const [user, setUser] = useState();
  const [cart, setCart] = useState(localState || []);
  const [counter, setCounter] = useState(localCounter || 0);
  const [message, setMessage] = useState({
    isMessage: false,
    text: "",
    status: ""
  });
  const [openCart, setOpenCart] = useState(false);

  const cartVisible = () => {
    setOpenCart(!openCart);
  };

  const logHandler = () => {
    setUser(null);
  };

  const addItem = item => {
    const currentCart = cartChecker(cart, item);
    setCart(currentCart);
    setCounter(cartCounter(currentCart));
    setMessage({
      ...message,
      isMessage: true,
      text: `${item.name} added to the basket`,
      status: "added"
    });
  };

  const increaseQuantity = item => {
    const currentCart = cartChecker(cart, item);
    setCart(currentCart);
    setCounter(cartCounter(currentCart));
  };
  const removeItem = item => {
    const currentCart = cart.filter(el => el !== item);
    setCart(currentCart);
    setCounter(cartCounter(currentCart));
    setMessage({
      ...message,
      isMessage: true,
      text: `${item.name} remove from the basket`,
      status: "removed"
    });
  };

  const decreaseQuantity = item => {
    if (item.quantity >= 2) {
      const currentItem = { ...item, quantity: item.quantity - 1 };
      // const currentCart = cart.filter(el => el.id !== currentItem.id);
      const newCart = cart.map(el => {
        if (el.id === currentItem.id) {
          return { ...el, quantity: currentItem.quantity };
        } else {
          return el;
        }
      });
      setCart(newCart);
      setCounter(cartCounter(newCart));
    }
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
      // addCollectionAndDocuments(
      //   "collection",
      //   DATA.map(({ title, items }) => ({ title, items }))
      // );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("counter", JSON.stringify(counter));
  }, [cart, counter]);

  const setMsg = () => {
    setMessage({
      ...message,
      isMessage: false,
      text: "",
      status: ""
    });
  };

  return (
    <div className="app">
      <Router history={history}>
        <UserContext.Provider value={{ user, logHandler }}>
          <CartContext.Provider
            value={{
              cart,
              counter,
              addItem,
              removeItem,
              openCart,
              cartVisible,
              increaseQuantity,
              decreaseQuantity
            }}
          >
            <MessageContext.Provider value={{ message, setMsg }}>
              <Messages />
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
            </MessageContext.Provider>
          </CartContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
