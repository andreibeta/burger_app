import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                //doing this to create a new object
                ingredients: {
                    ...state.ingredients,
                    //ingredientName will be a payload transmited through an dispatched action
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1//you get the number of the old ingredients+1
                },
                //recalculate the price and adjusting by the ingedredient which was added
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                //doing this to create a new object
                ingredients: {
                    ...state.ingredients,
                    //ingredientName will be a payload transmited through an dispatched action
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1//you get the number of the old ingredients+1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building:false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }
        default: 
            return state;
    }
    
};

export default reducer;