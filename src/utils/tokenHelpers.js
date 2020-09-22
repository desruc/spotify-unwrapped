import axios from 'axios';

// Constants
const expiryTime = 3600 * 1000;

// Setters
export const setLocalAccessToken = (token) => {
  window.localStorage.setItem('tokenTimestamp', Date.now());
  window.localStorage.setItem('accessToken', token);
};

export const setTokenData = (accessToken, refreshToken) => {
  window.localStorage.setItem('accessToken', accessToken);
  window.localStorage.setItem('refreshToken', refreshToken);
  window.localStorage.setItem('tokenTimestamp', Date.now());
};

// Getters
export const getLocalAccessToken = () => window.localStorage.getItem('accessToken');
export const getLocalRefreshToken = () => window.localStorage.getItem('refreshToken');

const getTokenTimestamp = () => window.localStorage.getItem('tokenTimestamp');
export const isTokenExpired = () => Date.now() - getTokenTimestamp() > expiryTime;

export const clearTokens = () => {
  window.localStorage.removeItem('tokenTimestamp');
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('refreshToken');
  window.location.reload();
};

// Refresh the auth token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token: accessToken } = data;
    return accessToken;
  } catch (e) {
    console.error('Error refreshing token: ', e); // eslint-disable-line
    clearTokens();
  }
  return null;
};

export const getNewToken = async () => {
  const localRefreshToken = getLocalRefreshToken();

  if (localRefreshToken) {
    const accessToken = await refreshAccessToken();
    return accessToken;
  }

  return null;
};
