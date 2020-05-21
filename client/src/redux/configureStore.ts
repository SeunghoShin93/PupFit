import { createStore, applyMiddleware } from "redux";
import penderMiddleware from "redux-pender";
import modules from "./modules";
// import logger from 'redux-logger'
import {composeWithDevTools} from 'remote-redux-devtools'

const composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'Your Instance Name',
  hostname: 'localhost',
  port: 8000 // the port your remotedev server is running at
})

const configureStore = () => {
  const store = createStore(
    modules,
    composeEnhancers(
      applyMiddleware(penderMiddleware())
      )
    )
  return store;
};
export default configureStore;
