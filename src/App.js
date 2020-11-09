import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ProductsContainer from "./products/components/productsContainer";
import SingleProductContainer from "./products/components/singleProductContainer";
import RegisterContainer from "./users/RegisterContainer";
import LoginContainer from "./users/LoginContainer";
import NavigationBarContainer from "./navbar/NavigationBarContainer.js";
import CategoriesContainer from "./categories/components/categoriesContainer";
import CartContainer from "./cart/CartContainer";
import OrderContainer from "./orders/OrderContainer";
import PaymentContainer from "./payment/MainScreen";

import Home from './home/home'
import {setLogin} from "./users/usersActionCreators";
import {getOrder} from "./orders/ordersActionCreators"
import CheckoutContainer from "./cart/CheckoutContainer";
import ReviewOrderContainer from './cart/ReviewOrderContainer'
import AdminContainer from "./admin/AdminContainer";
import AdminUsersContainer from "./admin/container/AdminUsersContainer";
//import AdminProductsContainer from "./admin/container/AdminProductsContainer";


function mapStateToProps(state) {
  return {
    user: state.users.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLogin: (user) => dispatch(setLogin(user)),
    getOrder: () => dispatch(getOrder()),
  };
}

class App extends React.Component {
  componentDidMount() {
    axios.get("/api/users/me", {withCredentials: true, headers: {"Content-Type": "application/json"}})
      .then((res) => {
        this.props.setLogin(res.data)
        this.props.getOrder()

      })
      .then((res) => {
        console.log("SET LOGIN DE APPjs");
        this.props.setLogin(res.data);
        this.props.getOrder();
      });
  }

  render() {
    return (
      <div className="App">
        <NavigationBarContainer />
        <Switch>
          <Route exact path="/products" component={ProductsContainer} />
          <Route exact path="/products/search" component={ProductsContainer} />
          <Route
            exact
            path="/products/:id"
            component={SingleProductContainer}
          />
          <Route exact path="/home" component={Home} />

          <Route exact path="/categories" component={CategoriesContainer} />
          <Route exact path="/register" component={RegisterContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/orders" component={OrderContainer} />

          <Route exact path="/cart" component={CartContainer} /> {/*revisar*/}
          <Route exact path="/cart/checkout" component={CheckoutContainer} />
          <Route exact path="/cart/checkout/payment" component={PaymentContainer} />
          <Route exact path="/cart/checkout/review" component={ReviewOrderContainer} />

          <Route exact path="/users" />
          <Route exact path="/admin" component={AdminContainer} />
          <Route path="/admin/users" component={AdminUsersContainer} />
          <Route path="/admin/products" component={AdminProductsContainer} />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
