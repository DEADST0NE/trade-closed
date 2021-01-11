import React, { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from '../generic/PrivateRoute'; 

import Pages from '../../pages';
import LoginPage from '../auth/Login';
import NotFoundPage from '../generic/NotFoundPage';
import { ReactComponent as SvgSprite } from '../../images/sprite.svg';

import { getAccessToken } from '../../services/authService';
import { setUserData } from '../../redux/user/actions';

const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getAccessToken(); 
    if (token) {
      dispatch(setUserData(token));
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>

          <PrivateRoute path="/">
            <Pages />
          </PrivateRoute>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
      <SvgSprite className="d-none" />
    </>
  );
};

export default App;