import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Private Route:
// renders <Route /> and passes all props to it

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return localStorage.getItem('token') ? <Component {...props} {...rest} /> : <Redirect to="/" />
      }}
    />
  );
};

export default PrivateRoute;