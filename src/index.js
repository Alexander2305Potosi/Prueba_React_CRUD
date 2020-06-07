import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ReactDOM from "react-dom";
import "./sass/index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";
import { loadState, saveState } from "./utils/localStorage";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);
store.subscribe(

  () => {
    saveState({
      dataList: store.getState().dataList
    });
  }

);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
