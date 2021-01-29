import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredient_name) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredient_name
    }
};

export const removeIngredient = (ingredient_name) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredient_name
    }
};
export const setIngredients = (set_ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients:set_ingredients
    };
};

export const fetchIngredientsFailed = () =>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-b6392.firebaseio.com/ingredients.json')
            .then(response => {
                //this.setState({ingredients: response.data});
                dispatch(setIngredients(response.data));
            })
            .catch(error =>{
                //this.setState({error: true})
                dispatch(fetchIngredientsFailed())
            });
    };
};

// export const initIngredients = () => async(dispatch) => {
//     try{
//         const { data } = await axios.get('https://react-my-burger-b6392.firebaseio.com/ingredients.json');
//         dispatch({type:actionTypes.SET_INGREDIENTS,payload:data});
//     }catch(error){
//         dispatch({type:actionTypes.FETCH_INGREDIENTS_FAILED,payload:error.message});
//     }
// }