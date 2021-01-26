import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Authentication/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import ForgotPassword from './containers/Authentication/ForgotPassword';



//we want to load some components lazily, we don't want to load all the components at once, only when they are accessed
const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders');
});
const asyncAuthentication = asyncComponent(()=>{
  return import('./containers/Authentication/Authentication');
});

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  
  render(){
      //routing setup for unauthenticated users
      let routes =(
        <Switch>
            <Route path ="/forgot/password" component={ForgotPassword} />
            <Route path = "/auth" component={asyncAuthentication} />
            <Route path = "/" exact component={BurgerBuilder} />
            {/* for anything unknown go to the homepage */}
            <Redirect to = "/"/>
        </Switch>
      );

      if(this.props.isAuthenticated){
        routes = (
          <Switch>
              <Route path = "/checkout" component={asyncCheckout} />
              <Route path = "/orders" component={asyncOrders} />
              <Route path = "/logout" component={Logout} />
              <Route path = "/auth" component={asyncAuthentication} />
              <Route path = "/" exact component={BurgerBuilder} />
              {/* for anything unknown go to the homepage */}
              <Redirect to = "/"/>
          </Switch>
        );
      }
      return (
          <Layout>
            {routes}
          </Layout>
        
      );
      }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
