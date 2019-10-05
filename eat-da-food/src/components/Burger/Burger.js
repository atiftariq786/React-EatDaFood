import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredien";
//import BurgerBuilder from "../../containers/BurgerBuilder/BurgerBuilder";

const burger = (props) => { 
    //object convert into an array
    let arrayIngredient =Object.keys(props.ingredients); 
        console.log({arrayIngredient});

    let transformedIngredients =arrayIngredient.map (igKey => {
        console.log({igKey});
        //Find the length of ingredient
        let spreadArr = [...Array(props.ingredients[igKey])];
        console.log({spreadArr});
        return spreadArr.map((_,i) => {
            let temp = igKey +i;
            console.log({temp})
            return <BurgerIngredient key={igKey +i} type={igKey} />
        } );
        
    })
    console.log({transformedIngredients})

    transformedIngredients =transformedIngredients.reduce((arr,el) => {
        console.log({arr});
        console.log({el});

        let tempR = arr.concat(el);
        console.log({tempR});
        return tempR;
    },[]);

    console.log({transformedIngredients}, 'after reduce')
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    //console.log({transformedIngredients});
    return(
        <div className = {styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type= "bread-bottom"/>
        
        </div>

    );
};
export default burger; 