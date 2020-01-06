import * as React from "react";
import * as ReactDOM from "react-dom";
import { ConnectedRouter as Router, routerMiddleware  } from "connected-react-router";
import { Provider } from "react-redux";
import { createBrowserHistory, History } from "history";
import App from "./App";
import { StoreConfig } from "./Redux/store";

const history: History = createBrowserHistory();
const store = StoreConfig(history);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById("react-app"));
