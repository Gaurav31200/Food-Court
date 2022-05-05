import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import AvailableMeals from "./Components/Meals/AvailableMeals";
import MealsSummary from "./Components/Meals/MealsSummary";
import useHttp from "./Components/Hooks/use-http";
import { cartActions } from "./Components/Store/cart";

let isInitial = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  useEffect(() => {
    sendRequest(
      {
        url: "https://food-court-312-default-rtdb.firebaseio.com/cart.json",
        headers: { "Content-Type": "application/json" },
      },
      (data) => {
        dispatch(
          cartActions.replaceCart({
            selectedItems: data.selectedItems || [],
            totalQuantity: data.totalQuantity,
            totalAmount: data.totalAmount,
          })
        );
      }
    );
  }, [sendRequest, dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      sendRequest(
        {
          url: "https://food-court-312-default-rtdb.firebaseio.com/cart.json",
          method: "PUT",
          body: {
            selectedItems: cart.selectedItems,
            totalQuantity: cart.totalQuantity,
            totalAmount: cart.totalAmount,
          },
          headers: { "Content-Type": "application/json" },
        },
        () => {}
      );
    }
  }, [sendRequest, cart]);
  return (
    <React.Fragment>
      <Cart />
      <Header />
      <MealsSummary />
      <AvailableMeals />
    </React.Fragment>
  );
}

export default App;
