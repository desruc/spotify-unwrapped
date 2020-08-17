import * as types from './types';

const initialState = {
  profile: null,
  artistDateRange: 'allTime',
  albumDateRange: 'allTime',
  genreDateRange: 'allTime',
  trackDateRange: 'allTime',
  recentlyPlayed: null,
  topArtistsAllTime: null,
  topArtistsHalfYear: null,
  topArtistsMonth: null,
  topTracksAllTime: null,
  topTracksHalfYear: null,
  topTracksMonth: null,
  selectedTrack: null,
  trackLoading: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
      };

    case types.CHANGE_ARTIST_DATE_RANGE:
      return {
        ...state,
        artistDateRange: action.range,
      };

    case types.CHANGE_ALBUM_DATE_RANGE:
      return {
        ...state,
        albumDateRange: action.range,
      };

    case types.CHANGE_GENRE_DATE_RANGE:
      return {
        ...state,
        genreDateRange: action.range,
      };

    case types.CHANGE_TRACK_DATE_RANGE:
      return {
        ...state,
        trackDateRange: action.range,
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

    case types.GET_RECENTLY_PLAYED_SUCCESS:
      return {
        ...state,
        recentlyPlayed: action.recentlyPlayed,
      };

    case types.GET_TRACK_SUCCESS:
    case types.SET_SELECTED_TRACK:
      return {
        ...state,
        selectedTrack: action.track,
      };

    default:
      return state;
  }
};

export default appReducer;

export const selectProfile = (state) => state.app.profile;

export const selectAristRange = (state) => state.app.artistDateRange;
export const selectAlbumRange = (state) => state.app.albumDateRange;
export const selectGenreRange = (state) => state.app.genreDateRange;
export const selectTrackRange = (state) => state.app.trackDateRange;

export const selectTopAristsAllTime = (state) => state.app.topArtistsAllTime;
export const selectTopArtistsHalfYear = (state) => state.app.topArtistsHalfYear;
export const selectTopArtistsMonth = (state) => state.app.topArtistsMonth;
export const selectTopArtists = (state) => ({
  allTime: state.app.topArtistsAllTime,
  halfYear: state.app.topArtistsHalfYear,
  month: state.app.topArtistsMonth,
});

export const selectTopTracksAllTime = (state) => state.app.topTracksAllTime;
export const selectTopTracksHalfYear = (state) => state.app.topTracksHalfYear;
export const selectTopTracksMonth = (state) => state.app.topTracksMonth;
export const selectTopTracks = (state) => ({
  allTime: state.app.topTracksAllTime,
  halfYear: state.app.topTracksHalfYear,
  month: state.app.topTracksMonth,
});

export const selectRecentlyPlayed = (state) => state.app.recentlyPlayed;
export const selectSelectedTrack = (state) => state.app.selectedTrack;
