import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

function Checkout(props){

    const burgerBuilder = useSelector(state => state.burgerBuilder);
    const { ingredients }  = burgerBuilder;
    const ordersList = useSelector(state => state.ordersList);
    const {finishedOrder} = ordersList;
    
    

    const checkoutCancelledHandler = () =>{
        props.history.goBack();
    }

    const checkoutContinuedHandler = () =>{
        props.history.replace('/checkout/contact-data');
    }
    const finishedOrderRedirect = finishedOrder ? <Redirect to ="/" /> : null;
    return (
        !ingredients 
        ? <Redirect to="/" />
        :<div>
            {finishedOrderRedirect}
        <CheckoutSummary
            ingredients={ingredients}
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContinued={checkoutContinuedHandler}
        />
        <Route path={props.match.path + '/contact-data'}
               component={ContactData} />
        </div> 
    );
}
export default Checkout;