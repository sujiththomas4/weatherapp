import React from "react";
import ReactDOM from "react-dom";
import { createInjectSagasStore, sagaMiddleware } from "redux-sagas-injector";
import { applyMiddleware, compose } from "redux";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import rootSaga from "./sagas";
import coreReducer from "./reducer";

/**
 * @description - Enhancer which applies the saga middleware to the app.
 */
const enhancers = [applyMiddleware(sagaMiddleware)];

/**
 * @description - Store being created with sagas injection along with their reducers.
 */
const store = createInjectSagasStore(
  { rootSaga },
  coreReducer,
  compose(...enhancers)
);

/**
 * @description - Render the app and subscribing to the store.
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
