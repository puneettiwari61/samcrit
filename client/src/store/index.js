import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer
});

export let store = createStore(rootReducer, applyMiddleware(thunk));
