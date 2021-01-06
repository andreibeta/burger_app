import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import BurgerBuilderReducer from './store/reducers/BurgerBuilderReducer';
import thunk from 'redux-thunk';
import OrderReducer from './store/reducers/OrderReducer';
import AuthenticationReducer from './store/reducers/AuthenticationReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: BurgerBuilderReducer,
  order: OrderReducer,
  authentication: AuthenticationReducer
});

//with this kind of store now we can run async code through our actionCreators
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
