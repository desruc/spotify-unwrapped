import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PageHeader from '../components/PageHeader';
import Flex from '../components/Flex';

import keyframes from '../styles/keyframes';

import { getPlaylists } from '../spotify';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
  }
`;

const ErrorHeading = styled.h2`
  text-align: center;
`;

const LoadingBox = styled.div`
  height: 150px;
  width: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  @media (min-width: 768px) {
    height: 200px;
  }
`;

const LoadingText = styled.span`
  color: ${({ theme }) => theme.secondary};
  background-color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
`;

const PlaylistImageLink = styled(Link)`
  width: 100%;
  margin-bottom: 16px;
`;

const PlaylistImage = styled.img`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  border-radius: 6px;
`;

const PlaylistName = styled(Link)`
  display: block;
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.heading};
  transition: all 0.2s ease-in-out;
`;

const PlaylistTracks = styled.span`
  display: block;
  font-size: 12px;
  color: ${({ theme }) => theme.secondary};
  font-weight: 700;
`;

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

  return (
    <main id="your-playlists">
      <PageHeader heading="Your playlists" />
      {playlistsError && (
        <ErrorHeading>
          There was an error retreiving your playlists. Please refresh the page.
        </ErrorHeading>
      )}
      {playlistsLoading && (
        <Grid>
          {[...new Array(8)].map((e, idx) => (
            <Flex
              key={`loading-playlists-${idx}`} // eslint-disable-line
              flexDirection="column"
              align="center"
            >
              <LoadingBox />
              <LoadingText>Loading playlists</LoadingText>
            </Flex>
          ))}
        </Grid>
      )}
      {!playlistsLoading && (
        <Grid id="playlist-grid">
          {playlists.map(({ id, name, images, tracks }) => (
            <Flex key={id} flexDirection="column" align="center">
              <PlaylistImageLink to={`/playlist/${id}`}>
                <PlaylistImage src={images[0].url} alt="Playlist Cover" />
              </PlaylistImageLink>
              <PlaylistName to={`/playlist/${id}`}>{name}</PlaylistName>
              <PlaylistTracks>{`${tracks.total} songs`}</PlaylistTracks>
            </Flex>
          ))}
        </Grid>
      )}
    </main>
  );
};

export default Playlists;
