import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatPage from '@pages/ChatPage/ChatPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import SignupPage from '@pages/SignupPage/SignupPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={ChatPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/sign-up' component={SignupPage} />
      </Switch>
    </Router>
  );
}

export default App;
