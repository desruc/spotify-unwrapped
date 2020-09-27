import axios from 'axios';

/**
 * Get the authorized users profile
 */
export const getUserProfile = async () => {
  const { data } = await axios.get('https://api.spotify.com/v1/me');
  return data;
};

/**
 * Get the authorized users all time top artists
 */
export const getAllTimeArtists = async () => {
  const {
    data: { items },
  } = await axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term'
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
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term'
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
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term'
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
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term'
  );
  return items;
};

/**
 * Get the authorized users top tracks from the past six months
 */
export const getSixMonthTracks = async () => {
  const {
    data: { items },
  } = await axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term'
  );
  return items;
};

/**
 * Get the authorized users top tracks from the past month
 */
export const getMonthTracks = async () => {
  const {
    data: { items },
  } = await axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term'
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
    'https://api.spotify.com/v1/me/player/recently-played?limit=50'
  );
  return items;
};

/**
 * Get a track object
 * @param {String} trackId
 */
export const getTrack = async (trackId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/tracks/${trackId}`
  );
  return data;
};

/**
 * Get the features of a track (loudness, liveness, etc)
 * @param {String} trackId
 */
export const getTrackFeatures = async (trackId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/audio-features/${trackId}`
  );
  return data;
};

/**
 * Get the audio analysis of a track
 * @param {String} trackId
 */
export const getTrackAnalysis = async (trackId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/audio-analysis/${trackId}`
  );
  return data;
};

/**
 * Get tracks similar to the id supplied
 * @param {String} trackId
 */
export const getTrackRecommendations = async (trackId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}&limit=16`
  );
  return data;
};

/**
 * Get an album object
 * @param {String} albumId
 */
export const getAlbum = async (albumId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/albums/${albumId}`
  );
  return data;
};

/**
 * Get an artist object
 * @param {String} artistId
 */
export const getArtist = async (artistId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}`
  );
  return data;
};

/**
 * Get an artists albums and singles
 * @param {String} artistId
 */
export const getArtistAlbums = async (artistId) => {
  const {
    data: { items },
  } = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=50&country=from_token`
  );
  return items;
};

/**
 * Get an artists top tracks
 * @param {String} artistId
 */
export const getArtistTopTracks = async (artistId) => {
  const {
    data: { tracks },
  } = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=from_token`
  );
  return tracks;
};

/**
 * Get artists related to the supplied artist
 * @param {String} artistId
 */
export const getRelatedArtists = async (artistId) => {
  const {
    data: { artists },
  } = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`
  );
  return artists;
};

/**
 * Get the auth users playlists
 */
export const getPlaylists = async () => {
  const {
    data: { items },
  } = await axios.get('https://api.spotify.com/v1/me/playlists?limit=50');
  return items;
};

/**
 * Get a playlists details (name, owner, etc)
 * @param {String} playlistId
 */
export const getPlaylistDetails = async (playlistId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}`
  );
  return data;
};

/**
 * Get a playlists tracks
 * @param {String} playlistId
 */
export const getPlaylistTracks = async (playlistId) => {
  const {
    data: { items },
  } = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`
  );
  return items;
};

export const getRecommendationsForTracks = async (tracks) => {
  const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
  const seedTracks = shuffledTracks
    .slice(0, 5)
    .map(({ track }) => track.id)
    .join(',');

  const {
    data: { tracks: recommendations },
  } = await axios.get(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks}&limit=50`
  );
  return recommendations;
};
