import axios from 'axios';
import { getHashParams } from './helpers';

// Constants
const expiryTime = 3600 * 1000;

// Getters & Setters
const setTokenTimestamp = () =>
  window.localStorage.setItem('tokenTimestamp', Date.now());
const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem('accessToken', token);
};
const setLocalRefreshToken = (token) =>
  window.localStorage.setItem('refreshToken', token);
const getTokenTimestamp = () => window.localStorage.getItem('tokenTimestamp');
const getLocalAccessToken = () => window.localStorage.getItem('accessToken');
const getLocalRefreshToken = () => window.localStorage.getItem('refreshToken');

// Refresh the auth token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get the tokens on callback
export const getToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error('getAccessToken error -> ', error);
    refreshAccessToken();
  }

  if (Date.now() - getTokenTimestamp() > expiryTime) {
    console.warn('Auth token has expired, refreshing...');
    refreshAccessToken();
  }

  const token = getLocalAccessToken();
  const refreshToken = getLocalRefreshToken();

  if (!refreshToken || refreshToken === 'undefined') {
    setLocalRefreshToken(refresh_token);
  }

  if (!token || token === 'undefined') {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return token;
};

export const clearTokens = () => {
  window.localStorage.removeItem('tokenTimestamp');
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('refreshToken');
  window.location.reload();
};

export const token = getToken();
