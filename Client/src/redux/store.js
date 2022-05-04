import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


import AsyncStorage from "@react-native-async-storage/async-storage";
import {reducer} from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "folder", "note"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

// export const store =  new createStore(persistedReducer, applyMiddleware(thunk));

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
