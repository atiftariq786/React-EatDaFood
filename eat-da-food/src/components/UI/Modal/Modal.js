import React, {Component} from "react";
import styles from "./Modal.module.css"
import Aux from "../../../hoc/Aux";
import BackDrop from "../Backdrop/Backdrop";

class Modal extends Component {
    

    render(){

        return(
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed} ></BackDrop>
                <div 
                    className={styles.Modal}
                    style={{transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: this.props.show ? "1": "0"}}>
                    {this.props.children}
                </div>
            
        </Aux>
        )
    }
} 
export default Modal;