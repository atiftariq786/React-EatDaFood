import React, {Component} from "react";
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
                    value:""
                },                
                street : {
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Street"
                    },
                    value:""
                },
                zipCode : {
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Zipcode"
                    },
                    value:""
                },
                country: {
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Country"
                    },
                    value:""
                },               
                email: {
                    elementType:"input",
                    elementConfig:{
                        type:"email",
                        placeholder:"Your E-Mail"
                    },
                    value:""
                },            
                deliveryMethod: {
                    elementType:"select",
                    elementConfig:{
                        options:[
                            {value:"fastest", displayValue: "Fastest"},
                            {value:"cheapest", displayValue: "Cheapest"},
                            
                        ]
                    },
                    value:""
                }
        },
        loading : false
    }
    orderHandler = (event) =>{
        event.preventDefault();
        console.log(this.props.ingredients);

        this.setState({loading: true});
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,  
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

    render(){ 
        const formelementsArray =[];
        for(let key in this.state.orderForm){
            formelementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                
                
                {formelementsArray.map(formelement => (
                    <Input
                        key ={formelement.id} 
                        elementType = {formelement.config.elementType}
                        elementConfig = {formelement.config.elementConfig}
                        value={formelement.config.value} />
                ))}              
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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
export default ContactData;