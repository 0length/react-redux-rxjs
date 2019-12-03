import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable';
import {rootEpic} from './epic'
import thunkMiddleware from "redux-thunk";
import RootReducer from "./RootReducer";

const epicMiddleware = createEpicMiddleware();
const middleware = applyMiddleware(thunkMiddleware, createLogger(), epicMiddleware);
// const Store = createStore(RootReducer, composeWithDevTools(middleware));
const Store = createStore(RootReducer,composeWithDevTools(middleware));
 epicMiddleware.run(rootEpic);
export default Store;
