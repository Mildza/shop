import React, { useState, useReducer, useCallback } from "react";
import { useHistory } from "react-router-dom";

import "./LogIn.scss";
import Input from "./../../shared/input/Input";
import Button from "./../../shared/button/Button";

import { loginState, registerState } from "./initState";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD
} from "./../../shared/input/validators";
import {
  auth,
  signInWithGoogle,
  createUserProfile
} from "./../../firebase/firabase-util";

const formReducer = (state, action) => {
  if (action.type === "REGISTER") {
    state = {};
    state = registerState;
  }
  if (action.type === "LOGIN") {
    state = {};
    state = loginState;
  }

  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const LogIn = () => {
  const [toggle, setToggle] = useState(false);
  const [state, dispatch] = useReducer(formReducer, loginState);
  const { email, password, displayName } = state.inputs;
  const history = useHistory();

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const createHandler = async e => {
    e.preventDefault();
    console.log("create user");

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      );
      createUserProfile({ ...user, displayName: displayName.value });
    } catch (error) {}
  };

  const toggleHandler = () => {
    if (toggle) {
      setToggle(false);
      dispatch({
        type: "LOGIN"
      });
    } else {
      setToggle(true);
      dispatch({
        type: "REGISTER"
      });
    }
  };
  const loginHandler = async e => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email.value, password.value);
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const signHandler = async e => {
    e.preventDefault();
    await signInWithGoogle();
    history.push("/home");
  };

  return (
    <div className="login">
      <div className="new-user" onClick={toggleHandler}>
        {!toggle ? "New user - Register?" : "Log in?"}
      </div>
      <form onSubmit={toggle ? createHandler : loginHandler}>
        {toggle && (
          <Input
            id="displayName"
            type="text"
            name="displayName"
            label="Display Name"
            errorText="Display Namename is required!"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            reset={toggle}
          />
        )}
        <Input
          id="email"
          type="email"
          name="email"
          label="Email"
          errorText="Enter valid email!"
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          reset={toggle}
        />
        <Input
          id="password"
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          errorText="Password must be at least 6 characters!"
          validators={[VALIDATOR_MINLENGTH(6)]}
          onInput={inputHandler}
          reset={toggle}
        />
        {toggle && (
          <Input
            id="confirm"
            type="password"
            name="confirm"
            label="Confirm Password"
            placeholder="Confirm Password"
            errorText="Passwords must be same!"
            validators={[VALIDATOR_PASSWORD(state.inputs.password.value)]}
            onInput={inputHandler}
            reset={toggle}
          />
        )}
        <div className="buttons">
          <Button type="submit" disabled={!state.isValid}>
            Submit
          </Button>
          <Button onClick={signHandler}>Sign with Google</Button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
