import { createStore, applyMiddleware } from "redux";
import penderMiddleware from "redux-pender";
import modules from "./modules";
// import logger from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'

const configureStore = () => {
  const store = createStore(
    modules,
    composeWithDevTools(
      applyMiddleware(penderMiddleware())
      )
    )
  return store;
};
export default configureStore;
