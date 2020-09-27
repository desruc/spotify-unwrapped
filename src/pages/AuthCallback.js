import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as types from '../store/types';

import { getHashParams } from '../utils/helpers';
import { setTokenData } from '../utils/tokenHelpers';

const AuthCallback = () => {
  // Hooks
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
  } = getHashParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // Set local storage and redux
    if (accessToken && refreshToken) {
      setTokenData(accessToken, refreshToken);
      dispatch({
        type: types.SET_LOGGED_IN,
        state: true,
      });
    }
  }, [dispatch, accessToken, refreshToken]);

  return <Redirect to="/" />;
};

export default AuthCallback;
