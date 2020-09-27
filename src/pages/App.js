import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import LoginSplash from './LoginSplash';
import AuthCallback from './AuthCallback';
import AuthenticatedView from './AuthenticatedView';

import * as types from '../store/types';
import { selectLoggedIn } from '../store/reducer';

import axiosConfig from '../utils/axiosConfig';
import { getNewToken, setLocalAccessToken } from '../utils/tokenHelpers';

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route exact path="/cb" component={AuthCallback} />
    <Route path="/" component={LoginSplash} />
  </Switch>
);

const App = () => {
  // Hooks
  const dispatch = useDispatch();

  // Local state
  const [initialized, setInitialized] = useState(false);

  // Select boostrapped
  const loggedIn = useSelector((state) => selectLoggedIn(state));

  useEffect(() => {
    // Initialize axios interceptor
    axiosConfig();

    async function refreshAuth() {
      const acccessToken = await getNewToken();
      if (acccessToken && !loggedIn) {
        setLocalAccessToken(acccessToken);
        dispatch({
          type: types.SET_LOGGED_IN,
          state: true,
        });
      }

      setInitialized(true);
    }

    refreshAuth();
  }, []);

  const ComputedApp = loggedIn ? AuthenticatedView : UnauthenticatedRoutes;

  return initialized ? <ComputedApp /> : <div>Loading</div>;
};

export default App;
