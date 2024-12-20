import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage is localStorage
import authReducer from "./features/authSlice";
import listingsReducer from './features/listingsSlice';
import locationsReducer from './features/locationsSlice';

// Persist configuration
const persistConfig = {
  key: "auth", // Key for the persist storage
  storage,     // Storage type
};

// Wrap the reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: persistedAuthReducer, // Use the persisted reducer
      listings: listingsReducer,
      location: locationsReducer,
    },
    devTools: true, // Enable Redux DevTools
  });

  const persistor = persistStore(store); // Create the persistor for the store
  return { store, persistor };
};
