import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

export default function Header() {
  return (
    <>
      <header className={classes.header}>
        <h1>Food Court</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src="image1.jpg" alt="Meals are missing"></img>
      </div>
    </>
  );
}
