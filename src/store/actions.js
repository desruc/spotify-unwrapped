import * as types from './types';
import * as spotify from '../spotify';

export const bootstrapArtists = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: true });

    const allTimArtists = await spotify.getAllTimeArtists();
    const sixMonthArtists = await spotify.getSixMonthArtists();
    const monthArtists = await spotify.getMonthArtists();

    dispatch({
      type: types.GET_TOP_ARTISTS_ALL_TIME_SUCCESS,
      artists: allTimArtists,
    });

    dispatch({
      type: types.GET_TOP_ARTISTS_HALF_YEAR_SUCCESS,
      artists: sixMonthArtists,
    });

    dispatch({
      type: types.GET_TOP_ARTISTS_MONTH_SUCCESS,
      artists: monthArtists,
    });

    await dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: false });
  } catch (error) {
    dispatch({ type: types.TOP_ARTISTS_ERROR });
  }
};

export const bootstrapTracks = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: true });

    const allTimeTracks = await spotify.getAllTimeTracks();
    const sixMonthTracks = await spotify.getSixMonthTracks();
    const monthTracks = await spotify.getMonthTracks();
    const recentlyPlayed = await spotify.getRecentlyPlayed();

    dispatch({
      type: types.GET_TOP_TRACKS_ALL_TIME_SUCCESS,
      tracks: allTimeTracks,
    });

    dispatch({
      type: types.GET_TOP_TRACKS_HALF_YEAR_SUCCESS,
      tracks: sixMonthTracks,
    });

    dispatch({
      type: types.GET_TOP_TRACKS_MONTH_SUCCESS,
      tracks: monthTracks,
    });

    dispatch({
      type: types.GET_RECENTLY_PLAYED_SUCCESS,
      recentlyPlayed,
    });

    await dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: false });
  } catch (error) {
    dispatch({ type: types.TOP_TRACKS_ERROR });
  }
};

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: types.PROFILE_LOADING_STATE, state: true });
    const data = await spotify.getUserProfile();
    dispatch({ type: types.GET_USER_PROFILE_SUCCESS, profile: data });
  } catch (error) {
    dispatch({ type: types.GET_USER_PROFILE_ERROR });
    dispatch({ type: types.PROFILE_LOADING_STATE, state: false });
  }
};

export const getAllTimeArtists = () => async (dispatch) => {
  try {
    const artists = await spotify.getAllTimeArtists();
    dispatch({
      type: types.GET_TOP_ARTISTS_ALL_TIME_SUCCESS,
      artists,
    });
  } catch (error) {
    dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: false });
    dispatch({ type: types.TOP_ARTISTS_ERROR });
  }
};

export const getHalfYearArtists = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: true });
    const artists = await spotify.getSixMonthArtists();
    dispatch({
      type: types.GET_TOP_ARTISTS_HALF_YEAR_SUCCESS,
      artists,
    });
  } catch (error) {
    dispatch({ type: types.TOP_ARTISTS_ERROR });
    dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: false });
  }
};

export const getMonthArtists = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: true });
    const artists = await spotify.getMonthArtists();
    dispatch({
      type: types.GET_TOP_ARTISTS_MONTH_SUCCESS,
      artists,
    });
  } catch (error) {
    dispatch({ type: types.TOP_ARTISTS_ERROR });
    dispatch({ type: types.TOP_ARTISTS_LOADING_STATE, state: false });
  }
};

export const getAllTimeTracks = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: true });
    const tracks = await spotify.getAllTimeTracks();
    dispatch({
      type: types.GET_TOP_TRACKS_ALL_TIME_SUCCESS,
      tracks,
    });
  } catch (error) {
    dispatch({ type: types.TOP_TRACKS_ERROR });
    dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: false });
  }
};

export const getHalfYearTracks = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: true });
    const tracks = await spotify.getSixMonthTracks();
    dispatch({
      type: types.GET_TOP_TRACKS_HALF_YEAR_SUCCESS,
      tracks,
    });
  } catch (error) {
    dispatch({ type: types.TOP_TRACKS_ERROR });
    dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: false });
  }
};

export const getMonthTracks = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: true });
    const tracks = await spotify.getMonthTracks();
    dispatch({
      type: types.GET_TOP_TRACKS_MONTH_SUCCESS,
      tracks,
    });
  } catch (error) {
    dispatch({ type: types.TOP_TRACKS_ERROR });
    dispatch({ type: types.TOP_TRACKS_LOADING_STATE, state: false });
  }
};

export const getRecentlyPlayed = () => async (dispatch) => {
  try {
    dispatch({ type: types.RECENTLY_PLAYED_LOADING_STATE, state: true });
    const recentlyPlayed = await spotify.getRecentlyPlayed();
    dispatch({
      type: types.GET_RECENTLY_PLAYED_SUCCESS,
      recentlyPlayed,
    });
  } catch (error) {
    await dispatch({ type: types.GET_RECENTLY_PLAYED_ERROR });
    await dispatch({ type: types.RECENTLY_PLAYED_LOADING_STATE, state: false });
  }
};

export const getTrack = (trackId) => async (dispatch) => {
  try {
    dispatch({ type: types.TRACK_LOADING_STATE, state: true });
    const track = await spotify.getTrack(trackId);
    dispatch({
      type: types.GET_TRACK_SUCCESS,
      track,
    });
    dispatch({ type: types.TRACK_LOADING_STATE, state: false });
  } catch (error) {
    dispatch({ type: types.TRACK_LOADING_STATE, state: false });
  }
};
