import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const orderBurgerSuccess = (id, order) => {
    return {
        type: actionTypes.ORDER_BURGER_SUCCESS,
        orderId: id,
        orderData: order,
    };
};

export const orderBurgerFailed = (error) => {
    return {
        type: actionTypes.ORDER_BURGER_FAILED,
        error: error,
    };
};

export const orderBurgerStart = () => {
    return {
        type: actionTypes.ORDER_BURGER_START,
    };
};

export const orderBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(orderBurgerStart());
        axios
            .post("/orders.json?auth=" + token, orderData)
            .then((response) => {
                dispatch(orderBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => {
                dispatch(orderBurgerFailed(error));
            });
    };
};

export const orderInit = () => {
    return {
        type: actionTypes.ORDER_INIT,
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.ORDERS_FETCH_SUCCESS,
        orders: orders,
    };
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.ORDERS_FETCH_FAILED,
        error: error,
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.ORDERS_FETCH_START,
    };
};

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios
            .get("/orders.json" + queryParams)
            .then((res) => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key,
                    });
                }

                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch((err) => {
                dispatch(fetchOrderFail(err));
            });
    };
};
