import React from 'react';

const order = (props) => {
    const ingredients = [];

    for (let ingredientsName in props.ingredients){
        ingredients.push({
            name: ingredientsName,
            amount: props.ingredients[ingredientsName]})
    }

    const ingredientOutput = ingredients.map( ig => {
        return <span className={ig.name} key={ig.name}>{ig.name} ({ig.amount}) </span>
        
    })
    return(
        <div className="Order">
            <div className="Order__ingredients">
            <h4>Ingredients</h4>
            <p>{ingredientOutput}</p>
            </div>
            <div className="Order__price">
            <h4>Price</h4>
            <p> <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            {/* <p>{props.timeStamp}</p> */}
            </div>
        </div>
    );
};

export default order;