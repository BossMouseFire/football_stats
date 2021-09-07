import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk"
import {rootReducer} from "./reducers";

// @ts-ignore
// const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
export const store = createStore(rootReducer, applyMiddleware(thunk));
