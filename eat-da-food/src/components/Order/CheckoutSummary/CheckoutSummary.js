import React from "react";
import styles from "./CheckoutSummary.module.css";
import Burger from "../../Burger/Burger";

const checkoutSummary = (props) => {

    return (
        <div>
            <h1>We hope it tastes well!</h1>
            <div style={{width: "300px", height:"300px", margin:"auto"}}></div>
            <Burger />
            </div>
    )

}
export default checkoutSummary;