import * as actionTypes from "../actions/actionsTypes";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const reducer = (state = initialState, action) => {
    console.log(action, state);
    switch (action.type) {
        case actionTypes.INGREDIENT_ADD:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] + 1,
                },
                totalPrice:
                    state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            };
        case actionTypes.INGREDIENT_DELETE:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] - 1,
                },
                totalPrice:
                    state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            };
        case actionTypes.INGREDIENTS_SET:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4
            };
        case actionTypes.INGREDIENTS_FETCH_FAILED:
            return {
                ...state,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer;
