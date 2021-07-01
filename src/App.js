import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import firebase from '@/firebase';
import { useDispatch, useSelector } from 'react-redux';
import ChatPage from '@pages/ChatPage/ChatPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import SignupPage from '@pages/SignupPage/SignupPage';
import { setUser } from '@redux/actions/user_actions';
import Loading from '@components/Loading/Loading';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user?.isLoading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push('/');
        dispatch(setUser(user));
      } else history.push('/login');
    });
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <Switch>
          <Route exact path='/' component={ChatPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/sign-up' component={SignupPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
