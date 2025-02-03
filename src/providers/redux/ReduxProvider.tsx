"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
type ProviderProps = {
  children: React.ReactNode;
};

const ReduxProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
