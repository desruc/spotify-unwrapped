import axios from 'axios';

import * as types from './types';
import { token } from '../utils/tokenHelpers';

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

export const getUserProfile = () => async (dispatch) => {
  try {
    await dispatch({ type: types.PROFILE_LOADING_STATE, state: true });
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers,
    });
    dispatch({ type: types.GET_USER_PROFILE_SUCCESS, profile: data });
  } catch (error) {
    await dispatch({ type: types.GET_USER_PROFILE_ERROR });
    await dispatch({ type: types.PROFILE_LOADING_STATE, state: false });
  }
};
