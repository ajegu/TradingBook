import React from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { dashboardLayoutRoutes } from './index';

import DashboardLayout from '../layouts/Dashboard';
import BlankLayout from '../layouts/Blank';
import Page404 from '../pages/Page404';
import { RouteInfoType } from '../types/types';
import async from '../components/Async';

const Auth = async(() => import('../components/Auth'));

const childRoutes = (Layout: React.ElementType, routes: Array<RouteInfoType>) =>
  routes.map(({ component: Component, children, path }, index: number) => {
    return children ? (
      children.map((element, index: number) => (
        <Route
          key={index}
          path={element.path}
          exact
          render={(props: RouteComponentProps) => (
            <Layout>
              <element.component {...props} />
            </Layout>
          )}
        />
      ))
    ) : Component ? (
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
    ) : null;
  });

const Routes = () => (

  <Router>
    <Auth>
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
    </Auth>
  </Router>

);

export default Routes;
