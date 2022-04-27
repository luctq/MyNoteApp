import { combineReducers } from "redux";
import authReducer from "./Auth";
import noteReducer from "./Note";
import folderReducer from "./Folder"

export const reducer = combineReducers({
  auth: authReducer,
  note: noteReducer,
  folder: folderReducer,
});
