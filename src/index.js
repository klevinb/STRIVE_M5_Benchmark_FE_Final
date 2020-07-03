import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ShowDetail from './components/ShowDetail'
import Register from './components/Register'

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <Route path="/" exact component={App}></Route>
    <Route path="/details/:id" component={ShowDetail}></Route>
    <Route path="/register/" exact component={Register}></Route>
  </Router>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
