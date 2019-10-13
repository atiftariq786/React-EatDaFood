import React from "react";
import styles from "./Order.module.css";

const order = (props)=> (
    <div className={styles.Order}>
        <p>Ingredients: salad (1)</p>
        <p>Price: <strong>USD 5.45</strong></p>
    </div>
);
export default order;