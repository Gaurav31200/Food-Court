import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../Store/ui-slice";
import classes from "./HeaderCartButton.module.css";

export default function HeaderCartButton() {
  const cartItems = useSelector((state) => state.cart.totalQuantity);
  const isBtnHighlighted = useSelector((state) => state.ui.isBtnHighlighted);
  const dispatch = useDispatch();

  const btnClasses = `${classes.button} ${
    isBtnHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartItems === 0) return;
    dispatch(uiActions.setBtnToHighlight());
  }, [cartItems, dispatch]);

  const openModalHandler = () => {
    dispatch(uiActions.openModal());
  };

  return (
    <button onClick={openModalHandler} className={btnClasses}>
      <span className={classes.icon}>
        <i className="fas fa-shopping-cart"></i>
      </span>{" "}
      Your Cart
      <span className={classes.badge}>{cartItems}</span>
    </button>
  );
}
