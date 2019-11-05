import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "reac-redux";

class Checkout extends Component {
   
    
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
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);