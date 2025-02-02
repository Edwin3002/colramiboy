"use client";

import { Provider } from "react-redux";
import { store } from "./store";
// import { PersistGate } from 'redux-persist/lib/integration/react';
// import { persistStore } from 'redux-persist';
type ProviderProps = {
  children: React.ReactNode;
};

const ReduxProvider: React.FC<ProviderProps> = ({ children }) => {
  //   const persistor = persistStore(store);

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={<div>Loading...</div>}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
};

export default ReduxProvider;
