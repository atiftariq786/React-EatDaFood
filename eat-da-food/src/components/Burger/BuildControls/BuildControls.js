import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import styles from "./BuildControls.module.css";

const controls =[
    { label: "Salad", type: "salad"},
    { label: "Bacon", type: "bacon"},
    { label: "Cheese", type: "cheese"},
    { label: "Meat", type: "meat"}
    

];
//console.log("Controls array map function testing(BuildControls.js)");
//const temp = controls.map(control => {
  //  console.log(control);
    //return null;
//})
//console.log(temp);

const buildControls = (props)=>(        
  
        <div className={styles.BuildControls}>
            <p>Current Price: {props.price.toFixed(2)}</p>

            {controls.map((ctrl) =>(               
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added = {() => props.ingredientAdded(ctrl.type)}
                removed = {()=> props.ingredientRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
                />                
            ))}
            <button className={styles.OrderButton}>ORDER NOW</button>
        
        </div>

    
);
export default buildControls;
// Method-3
const destroyerEs6 =(...arr) => {
    let arrayList = arr[0];

    arrayList = arrayList.filter((value)=> arr.indexOf(value)=== -1 ? true : false);
    console.log({arrayList})
    return arrayList; 
}  
    destroyerEs6([1, 2, 5, 1, 2, 3], 2, 3);//Output:[1,4,1]

