import React from "react";
import styles from "./CheckoutSummary.module.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) => {

    return (
        <div className={styles.checkoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: "300px", height:"300px", margin:"auto"}}>
                <Burger ingredient = {props.ingredients} />
            </div>
            <Button btnType = "Danger">CANCEL</Button>  
            <Button btnType = "Success">CONTINUE</Button>  
        </div>
    )

}
export default checkoutSummary;