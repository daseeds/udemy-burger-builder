import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        this.props.onIngredientsInit();
    }

    updatePurchaseSate(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
          this.props.onSetRedirectPath('/checkout');
          this.props.history.push('/auth');
        }
    };

    purchageCancelHanlder = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.props.ingredients) {
        //   queryParams.push(
        //     encodeURIComponent(i) +
        //       "=" +
        //       encodeURIComponent(this.props.ingredients[i])
        //   );
        // }
        // queryParams.push("price=" + this.state.totalPrice);
        // const queryString = queryParams.join("&");

        // this.props.history.push({
        //   pathname: "/checkout",
        //   search: "?" + queryString, //new URLSearchParams(this.state.ingredients).toString()
        // });
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? (
            <p>Ingredients can't load</p>
        ) : (
            <Spinner />
        );
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemoved={this.props.onIngredientDelete}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseSate(
                            this.props.ingredients
                        )}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    price={this.props.totalPrice}
                    purchaseCanceled={this.purchageCancelHanlder}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.props.ingredients}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchageCancelHanlder}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ingredientName) =>
            dispatch(burgerBuilderActions.ingredientAdd(ingredientName)),
        onIngredientDelete: (ingredientName) =>
            dispatch(burgerBuilderActions.ingredientDelete(ingredientName)),
        onIngredientsInit: () =>
            dispatch(burgerBuilderActions.ingredientsInit()),
        onInitPurchase: () => dispatch(burgerBuilderActions.orderInit()),
        onSetRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
