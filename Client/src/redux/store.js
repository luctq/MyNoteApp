import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";
import reducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store =  new createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);