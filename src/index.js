
import React from "react";
import ReactDOM from "react-dom";

// styles
import "assets/css/bootstrap.min.css";
// components
import App from "./App.js";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
