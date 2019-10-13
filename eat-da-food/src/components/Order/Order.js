import React from "react";
import styles from "./Order.module.css";

const order = (props)=> {

    const ingredients = [];

    for(let ingredientName in props.ingredients){

        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    
    
    return(
    <div className={styles.Order}>
        <p>Ingredients:  </p>
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
);
}
export default order;