import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux';

class Checkout extends Component {


  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuesHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  // componentWillMount() {
  //   console.log("[Checkout.js] componentDidMount", this.props);
  // }

//   componentDidUpdate() {
//     console.log("[Checkout.js] componentDidUpdate", this.props);
//     this.loadIngredients();
//   }

// Not used anymore, replaced with Redux
  loadIngredients() {
    if (!this.props.location.search) {
      return;
    }
    // let ingredients = {};
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    // this.props.location.search.slice(1).split('&').map(pair => {
    //     const [ key, value  ] = pair.split('=');
    //     ingredients[key] = +decodeURIComponent(value || '');
    //     return null;
    // })
    console.log(ingredients);
    let result = false;

    if (!this.props.ingredients) {
      result = false;
    } else {
      result = Object.keys(ingredients)
        .map((key) => {
          return ingredients[key] === this.props.ingredients[key];
        })
        .reduce((arr, el) => el);
    }

    console.log(result);

    if (!result) {
      this.setState({ ingredients: ingredients, price: price });
    }
  }

  render() {
    let summary = <Redirect to="/" />
    
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
        {purchasedRedirect}
        <CheckoutSummary
          checkoutCanceled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuesHandler}
          ingredients={this.props.ingredients}
        />
                <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
        </div>
      )
    }
    return summary;
  }
}


const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};


export default connect(
  mapStateToProps
)(Checkout);