import React, { Component, useEffect } from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect, useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {fetchOrders} from '../../store/actions/OrderActionCreators';
import order from "../../components/Order/Order";

function Orders(props){

    // componentDidMount(){
    //   this.props.onFetchOrders(this.props.token, this.props.userId);
    // }
    const ordersList = useSelector(state => state.ordersList);
    const {orders, purchaseStatus} = ordersList;
    const authentication = useSelector(state => state.authentication);
    const {token, userId} = authentication;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrders(token,userId));
        return () => {

        }
    },[]);

    return(
        purchaseStatus 
        ? <Spinner />
        :<div>{orders.map(order => (
            <Order 
            key={order.id}
            ingredients = {order.ingredients}
            price = {order.price}
             />
        ))}
        </div>
        
    );

}


export default Orders;