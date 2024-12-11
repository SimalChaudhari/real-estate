"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "./store";
import LoadingComponent from "./LoadingComponent";

const StoreProvider = ({ children }) => {
  const storeRef = useRef();

  if (!storeRef.current) {
    const { store, persistor } = makeStore(); // Initialize store and persistor once
    storeRef.current = { store, persistor };
  }

  const { store, persistor } = storeRef.current;

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
