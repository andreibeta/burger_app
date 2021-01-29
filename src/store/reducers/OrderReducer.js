import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    purchaseStatus: false,
    finishedOrder: false
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                //we paste all the proprieties of all the action order data, all the data passed onto the server
                ...action.orderData,
                //new propriety id that is reffering to orderId propriety from OrderActionCreators that receives the unique id 
                //from the server
                id: action.orderId
            }
            return{
                //we copy the old state
                ...state,
                purchaseStatus: false,
                finishedOrder: true,
                //we return a new concatenated array
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAILED:
            return{
                ...state,
                purchaseStatus: false
            };
        case actionTypes.PURCHASE_BURGER_START_PROCESS:
            return{
                ...state,
                purchaseStatus:true
            };
        case actionTypes.PURCHASE_REDIRECT:
            return {
                ...state,
                finishedOrder: false,
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                purchaseStatus:true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            //here i want to store the orders i fetched
            return {
                ...state,
                orders:action.payload,
                purchaseStatus: false,

            }
        case actionTypes.PURCHASE_BURGER_FAILED:
            return{
                ...state,
                purchaseStatus: false
            }
        default:
            return state;
    }
};

export default reducer;