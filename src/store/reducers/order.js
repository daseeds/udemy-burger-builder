import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_INIT:
            return updateObject(state, { purchased: false });
        case actionTypes.ORDER_BURGER_START:
            return updateObject(state, { purchased: true });
        case actionTypes.ORDER_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {
                id: action.orderId,
            });
            return updateObject(state, {
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder),
            });

        case actionTypes.ORDER_BURGER_FAILED:
            return updateObject(state, { loading: false });
        case actionTypes.ORDERS_FETCH_START:
            return updateObject(state, { loading: true });
        case actionTypes.ORDERS_FETCH_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false,
            };
        case actionTypes.ORDERS_FETCH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
