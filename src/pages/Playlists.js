import React, { useState, useEffect } from 'react';
import { getPlaylists } from '../spotify';

const Playlists = () => {
  // Local state
  const [playlists, setPlaylists] = useState([]);
  const [playlistsLoading, setPlaylistsLoading] = useState(true);
  const [playlistsError, setPlaylistsError] = useState(false);

  // Get user playlists on mount
  useEffect(() => {
    let isSubscribed = true;

    async function getUserPlaylists() {
      if (isSubscribed) {
        setPlaylistsLoading(true);
        setPlaylistsError(false);
      }

      getPlaylists()
        .then((data) => {
          if (isSubscribed) {
            setPlaylists(data);
            setPlaylistsLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setPlaylistsError(true);
            setPlaylistsLoading(false);
          }
        });
    }

    getUserPlaylists();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return <div>Playlists</div>;
};

export default Playlists;
