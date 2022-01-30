import { useDispatch } from "react-redux";
import useInput from "../Hooks/use-Input";
import { uiActions } from "../Store/ui-slice";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(uiActions.closeForm());
    dispatch(uiActions.closeModal());
  };
  const {
    value: name,
    valueIsValid: isNameValid,
    error: isNameHasError,
    inputValueHandler: inputNameHandler,
    inputBlurHandler: inputNameBlurHandler,
    reset: resetName,
  } = useInput((value) => value !== "");

  const {
    value: streetName,
    valueIsValid: isStreetNameValid,
    error: isStreetNameHasError,
    inputValueHandler: inputStreetNameHandler,
    inputBlurHandler: inputStreetNameBlurHandler,
    reset: resetStreetName,
  } = useInput((value) => value !== "");

  const {
    value: postalName,
    valueIsValid: isPostalNameValid,
    error: isPostalNameHasError,
    inputValueHandler: inputPostalNameHandler,
    inputBlurHandler: inputPostalNameBlurHandler,
    reset: resetPostalName,
  } = useInput((value) => value !== "");

  const {
    value: cityName,
    valueIsValid: isCityNameValid,
    error: isCityNameHasError,
    inputValueHandler: inputCityNameHandler,
    inputBlurHandler: inputCityNameBlurHandler,
    reset: resetCityName,
  } = useInput((value) => value !== "");

  let formIsValid = false;
  if (
    isNameValid &&
    isStreetNameValid &&
    isPostalNameValid &&
    isCityNameValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const details = {
      user: name,
      street: streetName,
      postal: postalName,
      city: cityName,
    };
    props.onConfirm(details);
    resetName();
    resetStreetName();
    resetPostalName();
    resetCityName();
  };
  const nameControlClasses = `${classes.control} ${
    isNameHasError ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    isStreetNameHasError ? classes.invalid : ""
  }`;
  const postalControlClasses = `${classes.control} ${
    isPostalNameHasError ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    isCityNameHasError ? classes.invalid : ""
  }`;
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.form}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            onChange={inputNameHandler}
            onBlur={inputNameBlurHandler}
            value={name}
          />
          {isNameHasError && (
            <p className={classes["error-text"]}>Name shouldn't be Empty!</p>
          )}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            onChange={inputStreetNameHandler}
            onBlur={inputStreetNameBlurHandler}
            value={streetName}
          />
          {isStreetNameHasError && (
            <p className={classes["error-text"]}>
              Street Name Shouldn't be Empty!
            </p>
          )}
        </div>
        <div className={postalControlClasses}>
          <label htmlFor="postal">Postal</label>
          <input
            id="postal"
            type="text"
            onChange={inputPostalNameHandler}
            onBlur={inputPostalNameBlurHandler}
            value={postalName}
          />
          {isPostalNameHasError && (
            <p className={classes["error-text"]}>
              Postal Name Shouldn't be Empty!
            </p>
          )}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            onChange={inputCityNameHandler}
            onBlur={inputCityNameBlurHandler}
            value={cityName}
          />
          {isCityNameHasError && (
            <p className={classes["error-text"]}>
              City Name Shouldn't be Empty!
            </p>
          )}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={closeHandler}>
          Cancel
        </button>
        <button
          disabled={!formIsValid}
          className={formIsValid ? classes.submit : classes.disabled}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};
export default Checkout;
