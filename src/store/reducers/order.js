import * as actionTypes from "../actions/actionsTypes";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};


const reducer = (state = initialState, action) => {
    console.log(action, state);
    switch (action.type) {
        case actionTypes.ORDER_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.ORDER_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };

        case actionTypes.ORDER_BURGER_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
