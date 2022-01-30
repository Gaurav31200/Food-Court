import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../Hooks/use-http";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import mealClasses from "./MealItem.module.css";

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealData) => {
      const loadedMeals = [];

      for (const mealKey in mealData) {
        loadedMeals.push({
          id: mealKey,
          name: mealData[mealKey].name,
          price: mealData[mealKey].price,
          description: mealData[mealKey].description,
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals(
      {
        url: "https://react-http-4b354-default-rtdb.firebaseio.com/meals.json",
      },
      transformMeals
    );
  }, [fetchMeals]);
  let mealList = <h2>No meals found. Start adding some!</h2>;
  if (meals.length > 0) {
    mealList = (
      <ul>
        {meals.map((meal) => (
          <li className={mealClasses.meal} key={meal.id}>
            <MealItem
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          </li>
        ))}
      </ul>
    );
  }
  let content = <Card className={classes.meals}>{mealList}</Card>;

  if (error) {
    content = <p className={classes.mealsError}>Failed to fetch</p>;
  }
  if (isLoading) {
    content = <p className={classes.mealsLoading}>Loading Meals</p>;
  }
  return content;
}
