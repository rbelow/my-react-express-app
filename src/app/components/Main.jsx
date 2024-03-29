import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedLogin } from "./Login";
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetail } from "./TaskDetail";
import { Redirect } from "react-router";

const RouteGuard = (Component) => ({ match }) => {
  console.info("Route guard", match);
  if (!store.getState().session.authenticated) {
    return <Redirect to="/"></Redirect>;
  }
  {
    return <Component match={match}></Component>;
  }
};

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Route exact path="/" component={ConnectedLogin}></Route>
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashboard)}
        ></Route>
        <Route
          exact
          path="/task/:id"
          render={RouteGuard(ConnectedTaskDetail)}
        ></Route>
      </div>
    </Provider>
  </Router>
);
