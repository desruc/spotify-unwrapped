import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import PageHeader from '../components/PageHeader';
import OverviewDetails from '../components/OverviewDetails';
import ArtistTopTracks from '../components/ArtistOverview/ArtistTopTracks';
import RelatedArtists from '../components/ArtistOverview/RelatedArtists';
import ArtistAlbums from '../components/ArtistOverview/ArtistAlbums';

import {
  getArtist,
  getArtistAlbums,
  getRelatedArtists,
  getArtistTopTracks,
} from '../spotify';

import { capitalizeWords } from '../utils/helpers';

const ArtistInfo = styled.div`
  margin-right: -16px;
  margin-left: -16px;
`;

const Column = styled.div`
  display: inline-block;
  width: 100%;
  padding: 0px 16px;
  margin-bottom: 40px;
  @media (min-width: 1200px) {
    ${({ albumWrap }) => !albumWrap && `width: 50%`}
  }
`;

const Followers = styled.h4`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.secondary};
`;

const Popularity = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.tertiary};
`;

const Genres = styled.h5`
  margin-top: 0;
`;

const ArtistOverview = () => {
  // Hooks
  const { artistId } = useParams();

  // Artist state
  const [artist, setArtist] = useState(null);
  const [artistLoading, setArtistLoading] = useState(true);
  const [artistError, setArtistError] = useState(false);

  // Artist albums state
  const [albums, setAlbums] = useState([]);
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [albumsError, setAlbumsError] = useState(false);

  // Artist top tracks state
  const [topTracks, setTopTracks] = useState([]);
  const [topTracksLoading, setTopTracksLoading] = useState(true);
  const [topTracksError, setTopTracksError] = useState(false);

  // Related artists state
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [relatedArtistsLoading, setRelatedArtistsLoading] = useState(true);
  const [relatedArtistsError, setRelatedArtistsError] = useState(false);

  // Get data on mount
  useEffect(() => {
    let isSubscribed = true;

    async function getSelectedArtist() {
      if (isSubscribed) {
        setArtistError(false);
        setArtistLoading(true);
      }

      getArtist(artistId)
        .then((data) => {
          if (isSubscribed) {
            setArtist(data);
            setArtistLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setArtistError(true);
            setArtistLoading(false);
          }
        });
    }

    async function getAlbums() {
      if (isSubscribed) {
        setAlbumsError(false);
        setAlbumsLoading(true);
      }

      getArtistAlbums(artistId)
        .then((data) => {
          if (isSubscribed) {
            setAlbums(data);
            setAlbumsLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setAlbumsError(true);
            setAlbumsLoading(false);
          }
        });
    }

    async function getTopTracks() {
      if (isSubscribed) {
        setTopTracksError(false);
        setTopTracksLoading(true);
      }

      getArtistTopTracks(artistId)
        .then((data) => {
          if (isSubscribed) {
            setTopTracks(data);
            setTopTracksLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setTopTracksError(true);
            setTopTracksLoading(false);
          }
        });
    }

    async function getRelated() {
      if (isSubscribed) {
        setRelatedArtistsError(false);
        setRelatedArtistsLoading(true);
      }

      getRelatedArtists(artistId)
        .then((data) => {
          if (isSubscribed) {
            setRelatedArtists(data);
            setRelatedArtistsLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setRelatedArtistsError(true);
            setRelatedArtistsLoading(false);
          }
        });
    }

    getSelectedArtist();
    getAlbums();
    getTopTracks();
    getRelated();

    return () => {
      isSubscribed = false;
    };
  }, [artistId]);

  return (
    <main>
      <PageHeader heading="Artist details" />
      <OverviewDetails
        loading={artistLoading}
        imageSrc={artist?.images[0]?.url}
        heading={artist?.name}
        spotifyUrl={artist?.external_links?.spotify}
      >
        <Popularity>Popularity: {artist?.popularity}</Popularity>
        <Followers>Followers: {artist?.followers?.total}</Followers>
        <Genres>
          {artist?.genres?.map((g, idx) => (
            <span key={g}>
              {capitalizeWords(g)}
              {artist.genres.length > 0 && idx === artist.genres.length - 1
                ? ''
                : ', '}
            </span>
          ))}
        </Genres>
      </OverviewDetails>
      <ArtistInfo>
        <Column>
          <ArtistTopTracks
            loading={topTracksLoading}
            error={topTracksError}
            topTracks={topTracks}
          />
        </Column>
        <Column>
          <RelatedArtists
            loading={relatedArtistsLoading}
            artists={relatedArtists}
          />
        </Column>
        <Column albumWrap>
          <ArtistAlbums loading={albumsLoading} albums={albums} />
        </Column>
      </ArtistInfo>
    </main>
  );
};

export default ArtistOverview;
