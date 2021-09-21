import { Redirect, Route, RouteProps } from 'react-router';
import { useAppSelector } from '../app/hooks';

interface Props extends RouteProps {}

function GuestRoute({ children, ...rest }: Props) {
  const authState = useAppSelector((s) => s.auth);
  return <Route {...rest} render={() => (authState.user ? <Redirect to="/" /> : children)} />;
}

export default GuestRoute;
