import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Checkout from "../UI/Checkout";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import useHttp from "../Hooks/use-http";
import { uiActions } from "../Store/ui-slice";
import { cartActions } from "../Store/cart";
export default function Cart() {
  const selectedItems = useSelector((state) => state.cart.selectedItems);
  const isConfirmed = useSelector((state) => state.ui.form);
  const modal = useSelector((state) => state.ui.modal);
  let totalAmount = useSelector((state) => state.cart.totalAmount);
  totalAmount = totalAmount.toFixed(2);
  const [didSubmit, setDidSubmit] = useState(false);
  const { isLoading, error, sendRequest: postMeals } = useHttp();
  const dispatch = useDispatch();
  const addUserDetails = (userDetails) => {
    postMeals(
      {
        url: "https://food-order-app-4f453-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: {
          user: userDetails,
          orderedItems: selectedItems,
        },
        headers: { "Content-Type": "application/json" },
      },
      () => {}
    );
    setDidSubmit(true);
  };
  const resetHandler = () => {
    setDidSubmit(false);
    dispatch(uiActions.resetUi());
    dispatch(cartActions.clearCart());
  };
  const closeModalHandler = () => {
    dispatch(uiActions.closeModal());
  };

  const openFormHandler = () => {
    dispatch(uiActions.openForm());
  };
  let cartItems = (
    <ul
      style={{ height: isConfirmed ? "0px" : "auto" }}
      className={classes["cart-items"]}
    >
      {selectedItems.map((item) => (
        <CartItem
          key={item.id}
          newItem={{
            id: item.id,
            name: item.name,
            qty: item.quantity,
            price: item.price,
          }}
        />
      ))}
    </ul>
  );

  if (selectedItems.length === 0) {
    cartItems = <p>No Items Selected So Far</p>;
  }

  let cartModalContent = (
    <>
      <div>{cartItems}</div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₹{totalAmount}</span>
      </div>
      {isConfirmed && <Checkout onConfirm={addUserDetails} />}
      {!isConfirmed && (
        <div className={classes.actions}>
          <button
            onClick={closeModalHandler}
            className={classes["button--alt"]}
          >
            Close
          </button>
          {selectedItems.length !== 0 && (
            <button className={classes.button} onClick={openFormHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  if (isLoading) {
    cartModalContent = <p>Sending Order Data....</p>;
  }
  if (!isLoading && didSubmit) {
    cartModalContent = (
      <>
        <p>Successfully sent the order</p>
        <div className={classes.actions} onClick={resetHandler}>
          <button className={classes["button--alt"]}>Close</button>
        </div>
      </>
    );
  }
  if (error) {
    cartModalContent = <p>{error}</p>;
  }
  return (modal && <Modal>{cartModalContent}</Modal>) || null;
}
