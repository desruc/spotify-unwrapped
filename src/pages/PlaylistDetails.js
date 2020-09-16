import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import PageHeader from '../components/Common/PageHeader';
import OverviewDetails from '../components/Common/OverviewDetails';
import ErrorMessage from '../components/Common/ErrorMessage';
import Track from '../components/Common/Track';
import TrackLoading from '../components/Common/TrackLoading';

import { getPlaylistDetails, getPlaylistTracks } from '../spotify';

import { randomId } from '../utils/helpers';

const List = styled.ul`
  flex: 1;
  transition: width 0.2s ease-in-out;
  margin: 0;
  padding: 0px;
  list-style: none;
`;

const TotalTracks = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.tertiary};
`;

const Followers = styled.h4`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.secondary};
`;

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

  const trackLoadingJsx = [...new Array(50)].map(() => (
    <TrackLoading key={randomId()} />
  ));

  const tracksJsx = playlistTracks.map((t) => (
    <Track key={randomId()} track={t.track} />
  ));

  return (
    <main>
      <PageHeader heading="Playlist Details" />
      <OverviewDetails
        loading={playlistLoading}
        heading={playlist?.name}
        spotifyUrl={playlist?.external_urls?.spotify}
        imageSrc={playlist?.images[0].url}
        error={playlistError}
      >
        <TotalTracks>{playlist && playlist.tracks.total} songs</TotalTracks>
        <Followers>{playlist && playlist.followers.total} followers</Followers>
      </OverviewDetails>
      {playlistTracksError && (
        <ErrorMessage>
          There was an error retreiving the playlists tracks
        </ErrorMessage>
      )}
      {!playlistTracksError && (
        <List>{playlistTracksLoading ? trackLoadingJsx : tracksJsx}</List>
      )}
    </main>
  );
};

export default PlaylistTracks;
