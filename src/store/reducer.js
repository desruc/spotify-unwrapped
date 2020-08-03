import * as types from './types';

const initialState = {
  profile: null,
  range: 'allTime',
  topArtistsAllTime: null,
  topArtistsHalfYear: null,
  topArtistsMonth: null,
  topTracksAllTime: null,
  topTracksHalfYear: null,
  topTracksMonth: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
      };

    case types.CHANGE_DATE_RANGE:
      return {
        ...state,
        range: action.range,
      };

    case types.GET_TOP_ARTISTS_ALL_TIME_SUCCESS:
      return {
        ...state,
        topArtistsAllTime: action.artists,
      };

    case types.GET_TOP_ARTISTS_HALF_YEAR_SUCCESS:
      return {
        ...state,
        topArtistsHalfYear: action.artists,
      };

    case types.GET_TOP_ARTISTS_MONTH_SUCCESS:
      return {
        ...state,
        topArtistsMonth: action.artists,
      };

    case types.GET_TOP_TRACKS_ALL_TIME_SUCCESS:
      return {
        ...state,
        topTracksAllTime: action.tracks,
      };

    case types.GET_TOP_TRACKS_HALF_YEAR_SUCCESS:
      return {
        ...state,
        topTracksHalfYear: action.tracks,
      };

    case types.GET_TOP_TRACKS_MONTH_SUCCESS:
      return {
        ...state,
        topTracksMonth: action.tracks,
      };

    default:
      return state;
  }
};

export default appReducer;

export const selectProfile = (state) => state.app.profile;
export const selectRange = (state) => state.app.range;
export const selectTopAristsAllTime = (state) => state.app.topArtistsAllTime;
export const selectTopArtistsHalfYear = (state) => state.app.topArtistsHalfYear;
export const selectTopArtistsMonth = (state) => state.app.topArtistsMonth;
export const selectTopTracksAllTime = (state) => state.app.topTracksAllTime;
export const selectTopTracksHalfYear = (state) => state.app.topTracksHalfYear;
export const selectTopTracksMonth = (state) => state.app.topTracksMonth;

export const selectTopTracks = (state) => ({
  allTime: state.app.topTracksAllTime,
  halfYear: state.app.topTracksHalfYear,
  month: state.app.topTracksMonth,
});

export const selectTopArtists = (state) => ({
  allTime: state.app.topArtistsAllTime,
  halfYear: state.app.topArtistsHalfYear,
  month: state.app.topArtistsMonth,
});
