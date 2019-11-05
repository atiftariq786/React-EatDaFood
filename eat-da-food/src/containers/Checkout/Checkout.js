import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
    state={
        ingredients:null,
        price:0
    }
    
    checkoutCancelledHandler=() =>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler= () =>{
        this.props.history.replace("/checkout/contact-data");
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients }
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinue={this.checkoutContinuedHandler}
                 />
                <Route 
                path={this.props.match.path + "/contact-data"}
                render={(props)=> (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}{...props} />)}
                />
                 
            </div>
        );
    }
}

export default Checkout;