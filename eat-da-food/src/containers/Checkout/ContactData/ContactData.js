import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state={
        name:"",
        email:"",
        address: {
            street:"",
            postalCode: ""
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
            customer : {
                name : "Atif",
                address : {
                    street : "Mission",
                    zipCode : "12345",
                    country: "United State"
                },
                email: "testapp@test.com"
            },
            deliveryMethod: "fastest"
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
        let form = (
            <form>
                <input type="text" className={styles.Input} name="name" placeholder="Your name" />
                <input type="text" className={styles.Input}  name="email" placeholder="Your Email" />
                <input type="text" className={styles.Input}  name="street" placeholder="Street" />
                <input type="text" className={styles.Input}  name="postal" placeholder="Postal Code" />
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