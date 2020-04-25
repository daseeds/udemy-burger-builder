import  * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const orderBurgerSuccess = (id , order) => {
    return {
        type: actionTypes.ORDER_BURGER_SUCCESS,
        orderId: id,
        orderData: order
    }
}

export const orderBurgerFailed = (error) => {
    return {
        type: actionTypes.ORDER_BURGER_FAILED,
        error: error
        
    }
}

export const orderBurgerStart = (orderData) => {
    return dispatch => {
        axios
        .post("/orders.json", orderData)
        .then((response) => {
            dispatch(orderBurgerSuccess(response.data, orderData))
        })
        .catch((error) => {
            dispatch(orderBurgerFailed(error))
        });
    }
}