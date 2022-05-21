import { combineReducers } from "redux";
import authReducer from "./Auth";
import noteReducer from "./Note";
import folderReducer from "./Folder"
import todoReducer from "./Todo"
export const reducer = combineReducers({
  auth: authReducer,
  note: noteReducer,
  folder: folderReducer,
  todo: todoReducer,
});
