import React from 'react';
import { hot } from 'react-hot-loader/root';

import { token } from '../utils/tokenHelpers';

import LoginSplash from './LoginSplash';
import AuthenticatedView from './AuthenticatedView';

const App = () => (token ? <AuthenticatedView /> : <LoginSplash />);

export default hot(App);
