import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import Store from "./Store";
import App from './App';
// import Toggle from "./Toggle";
import * as serviceWorker from "./serviceWorker";

export function TeloGoreng() {
  return (
    <Provider store={Store}>
        <App />
    </Provider>
  );
}
ReactDOM.render(<TeloGoreng />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
