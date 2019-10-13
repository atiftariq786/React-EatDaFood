import React from "react";
import styles from "./Order.module.css";

const order = (props)=> (
    <div className={styles.Order}>
        <p>Ingredients: {props.ingredients}</p>
        <p>Price: <strong>USD {props.price}</strong></p>
    </div>
);
export default order;