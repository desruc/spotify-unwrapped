import axios from 'axios';

import { token } from '../utils/tokenHelpers';

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

export const getTrackFeatures = async (trackId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      headers,
    }
  );
  return data;
};

export const getTrackAnalysis = async (trackId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/audio-analysis/${trackId}`,
    {
      headers,
    }
  );
  return data;
};

export const getTrackRecommendations = async (trackId) => {
  const {
    data,
  } = await axios.get(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}&limit=8`,
    { headers }
  );
  return data;
};
