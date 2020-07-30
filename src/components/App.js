import React from 'react';
import { hot } from 'react-hot-loader/root';

import { token } from '../utils/tokenHelpers';

import LoginSplash from './LoginSplash';
import Dashbaord from './Dashboard';

const App = () => (token ? <Dashbaord /> : <LoginSplash />);

export default hot(App);
