import {combineReducers, configureStore} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage";
import { baseApi } from "./features/baseApi";
import authReducer from "./features/auth/authSlice"
import { persistReducer, persistStore } from "redux-persist"
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


const persistConfig = {
    key: "root",
    storage,
    whitelist:["auth"]
}

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer
})

const persistedRootReducer  = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedRootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
     devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);