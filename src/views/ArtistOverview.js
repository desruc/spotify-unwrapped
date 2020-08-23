import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import PageHeader from '../components/PageHeader';
import ArtistDetails from '../components/ArtistDetails';
import ArtistTopTracks from '../components/ArtistTopTracks';
import RelatedArtists from '../components/RelatedArtists';
import ArtistAlbums from '../components/ArtistAlbums';

const PopularTracksWrap = styled.div`
  display: inline-block;
  width: 50%;
`;

import {
  getArtist,
  getArtistAlbums,
  getAllTimeTracks,
  getRelatedArtists,
  getArtistTopTracks,
} from '../spotify';

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
  console.log('ArtistDetails -> relatedArtists', relatedArtists);
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
      <ArtistDetails
        name={artist?.name}
        image={artist?.images[0].url}
        popularity={artist?.popularity}
        genres={artist?.genres}
        spotifyLink={artist?.external_links?.spotify}
      />
      <PopularTracksWrap>
        <ArtistTopTracks
          loading={topTracksLoading}
          error={topTracksError}
          topTracks={topTracks}
        />
      </PopularTracksWrap>
      <PopularTracksWrap>
        <RelatedArtists artists={relatedArtists} />
      </PopularTracksWrap>
      <ArtistAlbums albums={albums} />
    </main>
  );
};

export default ArtistOverview;
