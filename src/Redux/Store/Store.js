import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../Reducers/SignupReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "app_1",
  storage,
};

const persistedSignupReducer = persistReducer(persistConfig, signupReducer);

const store = configureStore({
  reducer: {
    signup: persistedSignupReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
