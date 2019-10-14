import React from "react";
import styles from "./Input.module.css";

const input = (props) =>{
    let inputElement = null;

    switch(props.inputType){
        case("input"): inputElement = <input /> 
        case("textarea"): inputElement = <textarea /> 
    }

    return (
        <div>
            <label>{props.label}</label>
        
        </div>
    )
}
export default input;