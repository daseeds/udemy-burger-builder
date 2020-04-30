import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

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

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    };
    const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
    );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    };
    return updatedState;
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
                state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    };
};

const reducer = (state = initialState, action) => {
    console.log(action, state);
    switch (action.type) {
        case actionTypes.INGREDIENT_ADD:
            return addIngredient(state, action);
        case actionTypes.INGREDIENT_DELETE:
            return removeIngredient(state, action);
        case actionTypes.INGREDIENTS_SET:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
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
