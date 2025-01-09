// 'use client' directive to make this a Client Component
"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "../cart/redux/store";


// Define the Provider wrapper
const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;