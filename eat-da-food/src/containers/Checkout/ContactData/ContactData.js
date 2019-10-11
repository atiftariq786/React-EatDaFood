import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";

class ContactData extends Component {
    state={
        name:"",
        email:"",
        address: {
            street:"",
            postalCode: ""
        }
    }

    render(){
        return(
            <div>
                <h4>Enter your contact data</h4>
                <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="text" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal Code" />
                </form>
                <Button btnType="Success">ORDER</Button>

            </div>
        )
    }
}
export default ContactData;