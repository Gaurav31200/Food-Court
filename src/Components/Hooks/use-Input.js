import { useReducer } from "react";

const initialInputState = {
  value: "",
  isValueTouched: false,
};
const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isValueTouched: state.isValueTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isValueTouched: true,
    };
  }
  return initialInputState;
};
const useInput = (validateValue) => {
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const error = !valueIsValid && inputState.isValueTouched;

  const inputValueHandler = (event) => {
    dispatchInput({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatchInput({ type: "BLUR" });
  };
  const reset = () => {
    dispatchInput({ type: "RESET" });
  };

  return {
    value: inputState.value,
    valueIsValid,
    isValueTouched: inputState.isValueTouched,
    error,
    inputValueHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
