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
        
        </div>

    
);
export default buildControls;