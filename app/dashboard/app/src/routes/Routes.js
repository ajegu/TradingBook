import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { dashboardLayoutRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import BlankLayout from "../layouts/Blank";
import Page404 from "../pages/Page404";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

const Routes = () => (
  <Router>
    <Switch>
      {childRoutes(DashboardLayout, dashboardLayoutRoutes)}
      <Route
        render={() => (
          <BlankLayout>
            <Page404 />
          </BlankLayout>
        )}
      />
    </Switch>
  </Router>
);

export default Routes;
