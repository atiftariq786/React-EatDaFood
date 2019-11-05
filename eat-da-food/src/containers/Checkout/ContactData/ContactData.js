import React, {Component} from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state={
        orderForm:{       
                name : {
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Your Name"
                    },
                    value:"",
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },                
                street : {
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Street"
                    },
                    value:"",
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipCode : {
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Zipcode"
                    },
                    value:"",
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                        
                    },
                    valid:false,
                    touched:false
                },
                country: {
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Country"
                    },
                    value:"",
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },               
                email: {
                    elementType:"input",
                    elementConfig:{
                        type:"email",
                        placeholder:"Your E-Mail"
                    },
                    value:"",
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },            
                deliveryMethod: {
                    elementType:"select",
                    elementConfig:{
                        options:[
                            {value:"fastest", displayValue: "Fastest"},
                            {value:"cheapest", displayValue: "Cheapest"},    
                        ]
                    },
                    value:"",
                    validation:{},
                    valid: true
                    
                }
        },
        formIsValid: false,
        loading : false
    }
    orderHandler = (event) =>{
        event.preventDefault();

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        console.log(this.props.ingredients);
        
        this.setState({loading: true});
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price, 
            orderData: formData 
        }
        axios.post("/orders.json" , order)
        .then(response => { 
            this.setState({loading: false});
            //console.log(response)
            this.props.history.push("/");
        })
        .catch(error => {
            this.setState({loading: false})
            //console.log(error));
        });
    }
    checkValidityHandler(value, rules) {
        let isValid = true;

        if(!rules){
            return true;
        }

        if (rules.required){
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event, inputIdentifier) => {
      
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidityHandler(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        console.log(updatedFormElement)
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){ 
        const formelementsArray =[];
        for(let key in this.state.orderForm){
            formelementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>    
                {formelementsArray.map(formelement => (
                    <Input
                        key ={formelement.id} 
                        elementType = {formelement.config.elementType}
                        elementConfig = {formelement.config.elementConfig}
                        value={formelement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formelement.id)}
                        invalid={!formelement.config.valid}
                        shouldValidate={formelement.config.validation }
                        touched = {formelement.config.touched} />
                ))}              
                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
            </form>      
        );
        if(this.state.loading){
            form = <Spinner />;
        }
        return(
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}                
            </div>
        )
    }
}
const mapStateToProps = (state) => {

    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);