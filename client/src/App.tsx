import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { JWT_KEY } from './app/api';
import { useAppDispatch } from './app/hooks';
import { setLoading, setUser, signOut } from './features/auth/authSlice';
import ConfirmForm from './features/auth/ConfirmForm';
import LoginForm from './features/auth/LoginForm';
import UserPage from './features/user_page';
import GuestRoute from './routes/GuestRoute';
import PrivateRoute from './routes/PrivateRoute';
import { auth } from './services/firebase';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user
          .getIdToken()
          .then((token) => localStorage.setItem(JWT_KEY, token))
          .catch((err) => {
            console.log(err);
            alert('Something went wrong when getting user token');
          });
      }
      //not checking using here is fine because this will return null if no user
      dispatch(setUser(user));
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <UserPage/>
        </PrivateRoute>
        <GuestRoute path="/login">
          <LoginForm />
        </GuestRoute>
        <GuestRoute path="/confirm">
          <ConfirmForm />
        </GuestRoute>
        <Route>
          <h1>404 page not found!</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
