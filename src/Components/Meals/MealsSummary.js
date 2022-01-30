import React from "react";
import Card from "../UI/Card";
import classes from "./MealsSummary.module.css";

export default function MealsSummary() {
  return (
    <Card className={classes.summary}>
      <h2>Delicious Food,Delivered To You</h2>
      Choose your favourite meal from our board selection of availaible meals
      and enjoy a delicious lunch or dinner at home.
      <br></br>
      <br></br>
      All our meals are cooked with high quality ingredients, just-in-time and
      of course by experienced chefs!
    </Card>
  );
}
