import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuesHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentWillMount() {
    console.log("[Checkout.js] componentDidMount", this.props);
    this.loadIngredients();
  }

//   componentDidUpdate() {
//     console.log("[Checkout.js] componentDidUpdate", this.props);
//     this.loadIngredients();
//   }

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

    if (!this.state.ingredients) {
      result = false;
    } else {
      result = Object.keys(ingredients)
        .map((key) => {
          return ingredients[key] === this.state.ingredients[key];
        })
        .reduce((arr, el) => el);
    }

    console.log(result);

    if (!result) {
      this.setState({ ingredients: ingredients, price: price });
    }
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuesHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={(props) => <ContactData 
                                ingredients={this.state.ingredients} 
                                price={this.state.price}
                                {...props} />}
        />
      </div>
    );
  }
}

export default Checkout;
