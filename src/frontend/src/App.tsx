import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Routes } from "./routes";
import { store } from "./store";

import "./App.css";

export const App = (): React.ReactElement => {
  return (
    <div className=" App">
      <HashRouter>
        <Provider store={store}>
          <Routes />
        </Provider>
      </HashRouter>
    </div>
  );
};
