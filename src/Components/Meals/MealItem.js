import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import Input from "../UI/Input";
import { cartActions } from "../Store/cart";
import classes from "./MealItem.module.css";
import formClasses from "./MealItemForm.module.css";

export default function MealItem(props) {
  const dispatch = useDispatch();
  const qty = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const quantity = qty.current.value;
    dispatch(
      cartActions.addItem({
        id: props.id,
        title: props.name,
        price: props.price,
        quantity,
      })
    );
    qty.current.value = 1;
  };
  return (
    <>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>₹{props.price}</p>
      </div>
      <form onSubmit={submitHandler} className={formClasses.form}>
        <Input
          label="Amount"
          ref={qty}
          input={{
            id: "amount",
            type: "number",
            min: "1",
            max: "5",
            defaultValue: "1",
            step: "1",
          }}
        ></Input>
        <button type="submit">+ Add</button>
      </form>
    </>
  );
}
