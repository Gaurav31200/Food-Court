import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../Store/cart";
import classes from "./CartItem.module.css";

export default function CartItem(props) {
  const dispatch = useDispatch();
  const { id, name, qty, price } = props.newItem;
  const addHandler = () => {
    dispatch(
      cartActions.addItem({
        id: id,
        title: name,
        price: price,
        quantity: 1,
      })
    );
  };
  const removeHandler = () => {
    dispatch(cartActions.removeItem(id));
  };
  return (
    <li className={classes["cart-item"]} key={id}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>₹{price}</span>
          <span className={classes.amount}>{qty}x</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={addHandler}>+</button>
        <button onClick={removeHandler}>-</button>
      </div>
    </li>
  );
}
