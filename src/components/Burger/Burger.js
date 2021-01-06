import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = (props) => {
    //turns that object into an array, in our case the ingredients which are an object
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredient_Key => {
                return [...Array(props.ingredients[ingredient_Key])].map((_,i)=>{
                    return <BurgerIngredient key={ingredient_Key+i} type={ingredient_Key} />
                })
                
            
    }).reduce((arr, el)=>{
        return arr.concat(el)
    },[]);
    if(transformedIngredients.length === 0){
        transformedIngredients= <p>Please start adding ingredients</p>
    }
    console.log(transformedIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;