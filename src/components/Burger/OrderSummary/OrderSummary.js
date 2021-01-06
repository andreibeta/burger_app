import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
                    .map(ingredient_key=>{
                    return <li key={ingredient_key}>
                        <span style={{textTransform:'capitalize'}}>{ingredient_key}</span>: {this.props.ingredients[ingredient_key]}
                        </li>
                    });

    return(
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {this.props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button buttonType="Danger" clicked={this.props.purchaseCancelEvent}>CANCEL</Button>
            <Button buttonType="Success"clicked={this.props.purchaseContinueEvent}>CONTINUE</Button>
        </Aux>
    )
    }
};

export default OrderSummary;