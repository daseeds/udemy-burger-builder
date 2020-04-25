import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const ingredientAdd = (name) => {
    return {
        type: actionTypes.INGREDIENT_ADD,
        ingredientName: name,
    };
};

export const ingredientDelete = (name) => {
    return {
        type: actionTypes.INGREDIENT_DELETE,
        ingredientName: name,
    };
};

export const ingredientsSet = (ingredients) => {
    return {
        type: actionTypes.INGREDIENTS_SET,
        ingredients: ingredients,
    };
};

export const ingredientsFetchFailed = () => {
    return {
        type: actionTypes.INGREDIENTS_FETCH_FAILED
    }
}

export const ingredientsInit = () => {
    return (dispatch) => {
        axios
            .get("/ingredients.json")
            .then((response) => {
                dispatch(ingredientsSet(response.data));
            })
            .catch((error) => {
                dispatch(ingredientsFetchFailed())
            });
    };
};
