import axios from 'axios';

import { token } from '../utils/tokenHelpers';

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

/**
 * Get the authorized users profile
 */
export const getUserProfile = async () => {
  const { data } = await axios.get('https://api.spotify.com/v1/me', {
    headers,
  });
  return data;
};

/**
 * Get the authorized users all time top artists
 */
export const getAllTimeArtists = async () => {
  const {
    data: { items },
  } = await axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
    {
      headers,
    }
  );
  return items;
};

/**
 * Get the authorized users top artists from the past six months
 */
export const getSixMonthArtists = async () => {
  const {
    data: { items },
  } = await axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term',
    {
      headers,
    }
  );
  return items;
};

/**
 * Get the authorized users top artists from the past month
 */
export const getMonthArtists = async () => {
  const {
    data: { items },
  } = await axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term',
    {
      headers,
    }
  );
  return items;
};

/**
 * Get the authorized users all time top tracks
 */
export const getAllTimeTracks = async () => {
  const {
    data: { items },
  } = await axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
    {
      headers,
    }
  );
  return items;
};

/**
 * Get the authorized users top tracks from the past six months
 */
export const getSixMonthsTracks = async () => {
  const { data: { items } } = await axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
    {
      headers,
    }
  );
  return items;
};

/**
 * Get the authorized users top tracks from the past month
 */
export const getMonthTracks = async () => {
  const { data: { items } } = await axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
    {
      headers,
    }
  );
  return items;
};

/**
 * Get the authorized users recently played tracks
 */
export const getRecentlyPlayed = async () => {
  const {
    data: { items },
  } = await axios.get(
    'https://api.spotify.com/v1/me/player/recently-played?limit=50',
    {
      headers,
    }
  );
  return items;
};

/**
 * Get a track object
 * @param {String} trackId
 */
export const getTrack = async (trackId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/tracks/${trackId}`,
    {
      headers,
    }
  );
  return data;
};

/**
 * Get the features of a track (loudness, liveness, etc)
 * @param {String} trackId
 */
export const getTrackFeatures = async (trackId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      headers,
    }
  );
  return data;
};

/**
 * Get the audio analysis of a track
 * @param {String} trackId
 */
export const getTrackAnalysis = async (trackId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/audio-analysis/${trackId}`,
    {
      headers,
    }
  );
  return data;
};

/**
 * Get tracks similar to the id supplied
 * @param {String} trackId
 */
export const getTrackRecommendations = async (trackId) => {
  const {
    data,
  } = await axios.get(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}&limit=16`,
    { headers }
  );
  return data;
};

/**
 * Get an album object
 * @param {String} albumId
 */
export const getAlbum = async (albumId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/albums/${albumId}`,
    {
      headers,
    }
  );
  return data;
};

/**
 * Get an artist object
 * @param {String} artistId
 */
export const getArtist = async (artistId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers,
    }
  );
  return data;
};

/**
 * Get an artists albums and singles
 * @param {String} artistId
 */
export const getArtistAlbums = async (artistId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single`,
    {
      headers,
    }
  );
  return data;
};

/**
 * Get an artists top tracks
 * @param {String} artistId
 */
export const getArtistTopTracks = async (artistId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
    {
      headers,
    }
  );
  return data;
};

/**
 * Get artists related to the supplied artist
 * @param {String} artistId
 */
export const getRelatedArtist = async (artistId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    {
      headers,
    }
  );
  return data;
};
