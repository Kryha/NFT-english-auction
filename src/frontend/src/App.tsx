import React from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { Routes } from "./routes";

export const App = (): React.ReactElement => {
  return (
    <div className=" App">
      <HashRouter>
        <Routes />
      </HashRouter>
    </div>
  );
};
