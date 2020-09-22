import axios from 'axios';

import {
  getLocalAccessToken,
  setLocalAccessToken,
  isTokenExpired,
  getNewToken,
  clearTokens,
} from './tokenHelpers';

const isUnauthenticatedRoute = (config = {}) => {
  const { url } = config;
  const endpoints = ['/refresh_token'];

  return endpoints.some((e) => url.includes(e));
};

const refreshBeforeRequest = async (config) => {
  let token = getLocalAccessToken();

  if (!isUnauthenticatedRoute(config)) {
    if (token && isTokenExpired()) {
      try {
        const newToken = await getNewToken();
        setLocalAccessToken(newToken);
        token = newToken;
      } catch (error) {
        clearTokens();
        return Promise.reject(error);
      }
    }

    const configWithAuth = {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` },
    };

    return configWithAuth;
  }

  return config;
};

const axiosConfig = () => {
  // Set default headers
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // Refresh token before request (if necessary)
  axios.interceptors.request.use(
    async (config) => refreshBeforeRequest(config),
    (error) => Promise.reject(error)
  );
};

export default axiosConfig;
