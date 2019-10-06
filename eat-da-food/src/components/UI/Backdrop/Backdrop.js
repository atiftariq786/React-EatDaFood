import React from "react";
import styles from "./BackDrop.module.css";

const backDrop = (props) => (

    props.show ? <div className={styles.Backdrop}></div> : null
);
export default backDrop;