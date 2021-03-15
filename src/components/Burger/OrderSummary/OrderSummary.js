import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
                    .map(ingredient_key=>{
                    return <li className="orderSummary" key={ingredient_key}>
                        <span className="orderSummary__element" style={{textTransform:'capitalize'}}>{ingredient_key}</span>: {this.props.ingredients[ingredient_key]}
                        </li>
                    });

    return(
        <Aux>
            <h3 className="orderSummaryHeader">Your order</h3>
            <p className="orderSummaryDescription">A delicious burger with the following ingredients:</p>
            <ul className="orderSummaryContainer">
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {this.props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <div className="orderButtonsContainer">
                <Button buttonType="Danger-v2" clicked={this.props.purchaseCancelEvent}>CANCEL</Button>
                <Button buttonType="Success-v2"clicked={this.props.purchaseContinueEvent}>CONTINUE</Button>
            </div>
        </Aux>
    )
    }
};

export default OrderSummary;