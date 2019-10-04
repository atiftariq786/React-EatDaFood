import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES ={
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component {

    state ={
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 4
       
    };
    
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
        return(
            <Aux>            
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls 
            ingredientAdded  = {this.addingIngredientHandler}
            ingredientRemoved = {this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}/>
            </Aux>
        )
    }
} 
export default BurgerBuilder;