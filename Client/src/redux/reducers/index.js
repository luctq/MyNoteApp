import { combineReducers } from "redux";
import authReducer from "./Auth";

export const reducer = combineReducers({
  auth: authReducer,
});
