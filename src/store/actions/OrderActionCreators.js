import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//we need to know and to pass the id of the order
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        //orderId: this is the id we will receive back from the server
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFailed =(error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error  
    };
}

export const purchaseBurgerBegin = (orderData, token) => {
    return dispatch => {
        //we want to return if purchaseBurgerStartProcess is dispatched through the store
        dispatch(purchaseBurgerStartProcess());
        axios.post('/orders.json?auth='+ token, orderData)
        .then(response => {
            console.log(response.data.name);
            //according to redux devtools response.data.name is the id that we want to store
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error=> {
            dispatch(purchaseBurgerFailed(error))
        });
    }
}

export const purchaseBurgerStartProcess = () =>{
    return {
        type: actionTypes.PURCHASE_BURGER_START_PROCESS
    };
};

export const purchaseRedirect = () => {
    return {
        type: actionTypes.PURCHASE_REDIRECT
    };
};

export const fetchOrdersSuccess = (orders) =>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) =>{
    return{
        type:actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
};

export const fetchOrderStart = () => {
    return{
        type:actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams )
                    .then(response => {
                        const fetchedOrders = [];
                        for(let key in response.data){
                            fetchedOrders.push({
                                ...response.data[key],
                                id:key
                            });
                        }
                        console.log(response.data);
                        dispatch(fetchOrdersSuccess(fetchedOrders));
                        
                    })
                    .catch(error => {
                        dispatch(fetchOrdersFailed(error));
                    });
    }
}