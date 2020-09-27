import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import appReducer from "./reducer";

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : compose;

const rootReducer = combineReducers({
  app: appReducer
});

export default createStore(
  rootReducer,
  compose(applyMiddleware(thunk), reduxDevTools)
);
