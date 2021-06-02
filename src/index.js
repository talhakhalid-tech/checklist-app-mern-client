import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./State/Reducers";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducer, applyMiddleware(thunk))}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
