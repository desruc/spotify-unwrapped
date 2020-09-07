import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from '../components/PageHeader';

import { getPlaylistDetails, getPlaylistTracks } from '../spotify';

const PlaylistTracks = () => {
  // Hooks
  const { playlistId } = useParams();

  // Local state
  const [playlist, setPlaylist] = useState(null);
  const [playlistLoading, setPlaylistLoading] = useState(true);
  const [playlistError, setPlaylistError] = useState(false);

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistTracksLoading, setPlaylistTracksLoading] = useState(true);
  const [playlistTracksError, setPlaylistTracksError] = useState(false);

  // Get data on mount
  useEffect(() => {
    let isSubscribed = true;

    async function getPlaylist() {
      if (isSubscribed) {
        setPlaylistLoading(true);
        setPlaylistError(false);
      }

      getPlaylistDetails(playlistId)
        .then((data) => {
          if (isSubscribed) {
            setPlaylist(data);
            setPlaylistLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setPlaylistError(true);
            setPlaylistLoading(false);
          }
        });
    }

    async function getTracks() {
      if (isSubscribed) {
        setPlaylistTracksLoading(true);
        setPlaylistError(false);
      }

      getPlaylistTracks(playlistId)
        .then((data) => {
          if (isSubscribed) {
            setPlaylistTracks(data);
            setPlaylistTracksLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setPlaylistTracksError(true);
            setPlaylistTracksLoading(false);
          }
        });
    }

    getTracks();
    getPlaylist();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <main>
      <PageHeader heading="Playlist" />
      {playlist && playlist.name}
    </main>
  );
};

export default PlaylistTracks;
