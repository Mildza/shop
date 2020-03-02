import React, { useReducer, useEffect } from "react";

import { validate } from "./validators";
import "./Input.scss";

const initState = {
  value: "",
  isTouched: false,
  isValid: false
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true
      };
    }
    case "RESET": {
      return {
        value: "",
        isTouched: false,
        isValid: false
      };
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, initState);

  const { id, onInput, validators } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput, props.reset]);

  useEffect(() => {
    dispatch({
      type: "RESET"
    });
  }, [props.reset]);

  const changeHandler = event => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH"
    });
  };

  return (
    <div
      className={`input-group  ${!inputState.isValid &&
        inputState.isTouched &&
        "input-group--invalid"} ${inputState.isValid && "input-group--valid"}`}
    >
      <label
        className={`${inputState.value.length && "shrink"}`}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input
        autoComplete="off"
        id={props.id}
        type={props.type}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
