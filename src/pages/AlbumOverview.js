import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import PageHeader from '../components/Common/PageHeader';
import OverviewDetails from '../components/Common/OverviewDetails';
import AlbumTracks from '../components/AlbumOverview/AlbumTracks';

import { getAlbum } from '../spotify';
import { getAlbumYear, getAlbumDuration } from '../utils/helpers';

const TrackArtist = styled(Link)`
  display: inline-block;
  font-size: 1.17em;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.secondary};
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.main};
  }
`;

const AlbumMeta = styled.h4`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.tertiary};
`;

const Error = styled.h4`
  padding: 16px;
  text-align: center;
`;

const AlbumOverview = () => {
  // Hooks
  const { albumId } = useParams();

  // Local state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [album, setAlbum] = useState(null);

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

  if (error)
    return (
      <main>
        <PageHeader heading="Album details" />
        <Error>
          There was an error retrieving the album details. Please refresh the
          page.
        </Error>
      </main>
    );

  return (
    <main>
      <PageHeader heading="Album details" />
      <OverviewDetails
        loading={loading}
        imageSrc={album?.images[0]?.url}
        heading={album?.name}
        spotifyUrl={album?.external_urls.spotify}
      >
        <>
          {album && album.artists.length > 0 && (
            <span>
              {album.artists.map(({ id: artistId, name: artistName }, idx) => (
                <Fragment key={artistId}>
                  <TrackArtist to={`/artist/${artistId}`}>
                    {artistName}
                  </TrackArtist>
                  {album.artists.length > 0 && idx === album.artists.length - 1
                    ? ''
                    : ', '}
                </Fragment>
              ))}
            </span>
          )}
        </>
        {album && (
          <AlbumMeta>
            {getAlbumYear(album)} . {album?.tracks?.items.length} songs .{' '}
            {getAlbumDuration(album)}
          </AlbumMeta>
        )}
      </OverviewDetails>
      <AlbumTracks
        loading={loading}
        tracks={album?.tracks?.items}
        albumArtists={album?.artists}
      />
    </main>
  );
};

export default AlbumOverview;
