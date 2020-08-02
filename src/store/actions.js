import axios from 'axios';

import * as types from './types';
import { token } from '../utils/tokenHelpers';

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: types.PROFILE_LOADING_STATE, state: true });
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers,
    });
    dispatch({ type: types.GET_USER_PROFILE_SUCCESS, profile: data });
  } catch (error) {
    await dispatch({ type: types.GET_USER_PROFILE_ERROR });
    await dispatch({ type: types.PROFILE_LOADING_STATE, state: false });
  }
};

export const getAllTimeArtists = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: true });
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
      {
        headers,
      }
    );
    dispatch({
      type: types.GET_TOP_ARTISTS_ALL_TIME_SUCCESS,
      artists: data.items,
    });
  } catch (error) {
    await dispatch({ type: types.GET_TOP_ARTISTS_ALL_TIME_ERROR });
    await dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: false });
  }
};

export const getHalfYearArtists = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: true });
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term',
      {
        headers,
      }
    );
    dispatch({
      type: types.GET_TOP_ARTISTS_HALF_YEAR_SUCCESS,
      artists: data.items,
    });
  } catch (error) {
    await dispatch({ type: types.GET_TOP_ARTISTS_HALF_YEAR_ERROR });
    await dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: false });
  }
};

export const getMonthArtists = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: true });
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term',
      {
        headers,
      }
    );
    dispatch({
      type: types.GET_TOP_ARTISTS_MONTH_SUCCESS,
      artists: data.items,
    });
  } catch (error) {
    await dispatch({ type: types.GET_TOP_ARTISTS_MONTH_ERROR });
    await dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: false });
  }
};

export const getAllTimeTracks = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: true });
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
      {
        headers,
      }
    );
    dispatch({
      type: types.GET_TOP_TRACKS_ALL_TIME_SUCCESS,
      tracks: data.items,
    });
  } catch (error) {
    await dispatch({ type: types.GET_TOP_TRACKS_ALL_TIME_ERROR });
    await dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: false });
  }
};

export const getHalfYearTracks = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: true });
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
      {
        headers,
      }
    );
    dispatch({
      type: types.GET_TOP_TRACKS_HALF_YEAR_SUCCESS,
      tracks: data.items,
    });
  } catch (error) {
    await dispatch({ type: types.GET_TOP_TRACKS_HALF_YEAR_ERROR });
    await dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: false });
  }
};

export const getMonthTracks = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: true });
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
      {
        headers,
      }
    );
    dispatch({
      type: types.GET_TOP_TRACKS_MONTH_SUCCESS,
      tracks: data.items,
    });
  } catch (error) {
    await dispatch({ type: types.GET_TOP_TRACKS_MONTH_ERROR });
    await dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: false });
  }
};
