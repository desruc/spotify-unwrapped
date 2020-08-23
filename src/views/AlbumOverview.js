import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from '../components/PageHeader';
import AlbumDetails from '../components/AlbumDetails';
import AlbumTracks from '../components/AlbumTracks';

import { getAlbum } from '../spotify';

const AlbumOverview = () => {
  // Hooks
  const { albumId } = useParams();

  // Local state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [album, setAlbum] = useState(null);
  console.log('AlbumOverview -> album', album);

  // Get the album on mount
  useEffect(() => {
    let isSubscribed = true;

    async function getSelectedAlbum() {
      if (isSubscribed) {
        setLoading(true);
      }

      getAlbum(albumId)
        .then((data) => {
          if (isSubscribed) {
            setAlbum(data);
            setLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setError(true);
            setLoading(false);
          }
        });
    }

    getSelectedAlbum();

    return () => {
      isSubscribed = false;
    };
  }, [albumId]);

  return (
    <main>
      <PageHeader heading="Album details" />
      <AlbumDetails name={album?.name} image={album?.images[0]?.url} />
      <AlbumTracks tracks={album?.tracks?.items} />
    </main>
  );
};

export default AlbumOverview;
