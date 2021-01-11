import React, { ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getAccessToken } from '../../../services/authService';

type privateRouteType = {
  children: ReactElement;
  path: string;
  exact?: boolean;
};

const PrivateRoute = ({
  children: Component,
  path,
  exact = false,
}: privateRouteType): ReactElement => {
  const authUser = getAccessToken();
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        authUser ? (
          Component
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;