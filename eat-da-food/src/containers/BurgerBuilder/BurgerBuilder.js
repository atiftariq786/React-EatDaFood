import React, {Component} from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component {

    state ={
        ingredients :null,
        totalPrice : 4,
        purchasable: false,
        purchasing : false,
        loading: false
       
    };
    componentDidMount(){
        axios.get("https://eat-da-food.firebaseio.com/ingredients.json")
        .then(response => {
           this.setState({ingredients: response.data}); 
        })
    }
    updatePurchaseState(ingredients){
       
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) =>{
            return sum + el;
        },0);
    this.setState({purchasable:sum>0})
    }
    purchaseHandler =()=>{
        this.setState({purchasing: true});
    }
    purchaseCancelHandler =()=>{
        this.setState({purchasing: false});
    }
    purchaseContinuedHandler =()=>{
        //alert("You are continue..!")
        this.setState({loading: true});
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
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
            this.setState({loading: false, purchasing:false});
            //console.log(response)
        })
        .catch(error => {
            this.setState({loading: false, purchasing:false})
            //console.log(error));
        });
        
    }
    
    addingIngredientHandler = (type) =>{
        console.log({type})
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice : newPrice,
            ingredients : updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);

    }
    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            totalPrice : newPrice,
            ingredients : updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);

    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
       // console.log({disabledInfo})
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
            //console.log(disabledInfo[key])
        }
        let orderSummary = null;
        let burger = <Spinner/>;

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                    ingredientAdded  = {this.addingIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary =  <OrderSummary 
            ingredients= {this.state.ingredients}
            purchasedCanceled ={this.purchaseCancelHandler}
            purchasedContinued={this.purchaseContinuedHandler}
            price={this.state.totalPrice}/>
        }
        

        if(this.state.loading){
            orderSummary = <Spinner/>;
        }    



        return(
            <Aux>
            <Modal show ={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
            </Aux>
        )
    }
} 
export default withErrorHandler(BurgerBuilder, axios);