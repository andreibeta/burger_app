import React,{ Component } from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux'; 
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';



export class BurgerBuilder extends Component{
    //these are UI local states that we are using only here and there is no need to use them globally through our global redux store
    //they can coexist with redux
    state = {
        //ingredients: null,
        //totalPrice: 5,
        //purchaseable: false,
        purchasingButton: false,
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }
    
    updatePurchaseState(updated_ingredients){
        //this will create an array of entries
        const sum = Object.keys(updated_ingredients).map(
            ingValues => {
                return updated_ingredients[ingValues]
            }
        ).reduce((sum,el) =>{
            return sum+el;
        }, 0);
        return sum > 0;//this will return true/false if it is purchaseable or not
    }

    

    purchaseButtonHandler = () => {
        if(this.props.isAuthenticated){
        this.setState({purchasingButton:true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasingButton: false});
    }
    purchaseContinueHandler = () =>{
        this.props.onInitPurchase();
        //alert('You continued!');
        this.props.history.push({
            pathname:'/checkout',
        });
    }

    render(){
        const disabledInfo = {
            //...this.state.ingredients
            ...this.props.ingr
        };
        //this would return a value with true/false state
        for( let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i] <= 0;
        }
        //it will return in this way
        //{salad:true, meat: false .....}
       
            
        
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        let orderSummary = null;

        if(this.props.ingr !== null){
        burger = (
            <Aux>
                    <Burger ingredients={this.props.ingr}/>
                    <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    // price={this.state.totalPrice}
                    price = {this.props.price}
                    purchaseable={this.updatePurchaseState(this.props.ingr)}
                    isAuth ={this.props.isAuthenticated}
                    order={this.purchaseButtonHandler} />
            </Aux>
            );
                    orderSummary = <OrderSummary 
                ingredients={this.props.ingr}
                purchaseCancelEvent={this.purchaseCancelHandler}
                purchaseContinueEvent={this.purchaseContinueHandler}
                price={this.props.price.toFixed(2)}/>;
        }
        if(this.state.loading){
            orderSummary=<Spinner />;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasingButton} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}    
            </Aux>
        );
    }
}
const mapStateToProps = state =>{
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.authentication.token !== null

    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingr_name) => dispatch(actions.addIngredient(ingr_name)),
        onIngredientRemoved: (ingr_name) => dispatch(actions.removeIngredient(ingr_name)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseRedirect()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));