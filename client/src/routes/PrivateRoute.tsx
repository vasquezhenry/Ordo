import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router';
import { useAppSelector } from '../app/hooks';

interface Props extends RouteProps {}

function PrivateRoute({ children, ...rest }: Props) {
  const authState = useAppSelector((s) => s.auth);
  return <Route {...rest} render={() => (authState.user ? children : <Redirect to="/login" />)} />;
}

export default PrivateRoute;
