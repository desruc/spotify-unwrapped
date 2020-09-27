import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import PageHeader from '../components/Common/PageHeader';
import OverviewDetails from '../components/Common/OverviewDetails';
import Flex from '../components/Common/Flex';
import AudioAnalysis from '../components/TrackOverview/AudioAnalysis';
import AudioFeatures from '../components/TrackOverview/AudioFeatures';
import TrackRecommendations from '../components/TrackOverview/TrackRecommendations';

import { getTrack, getTrackFeatures, getTrackAnalysis } from '../spotify';

import { getAlbumYear, formatDuration, parseAnalysis } from '../utils/helpers';

const TrackArtist = styled.h3`
  display: inline-block;
  cursor: pointer;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.secondary};
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.main};
  }
`;

const TrackAlbum = styled.h4`
  display: inline-block;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.tertiary};
  & span {
    cursor: pointer;
  }
`;

const Column = styled.div`
  width: 100%;
  margin-top: ${({ isAnalysis }) => isAnalysis ? '40px' : '0px'};
  @media (min-width: 768px) {
    width: 50%;
    padding: ${({ isAnalysis }) => isAnalysis ? '0px 0px 0px 16px' : '0px 16px 0px 0px'};
    margin-top: 0px;
  }
  @media (min-width: 1500px) {
    width: 25%;
    padding: ${({ isAnalysis }) => isAnalysis ? '0px 16px 0px 16px' : '0px 16px 0px 0px'};
  }
`;

const RelatedTracksColumn = styled.div`
  width: 100%;
  margin-top: 40px;
  @media (min-width: 1500px) {
    margin-top: 0px;
    width: 50%;
    padding-left: 16px;
  }
`;

const TrackOverview = () => {
  // Hooks
  const history = useHistory();
  const { trackId } = useParams();

  // Track local state
  const [track, setTrack] = useState(null);
  const [trackLoading, setTrackLoading] = useState(true);
  const [trackError, setTrackError] = useState(false);

  // Features local state
  const [features, setFeatures] = useState(null);
  const [featuresLoading, setFeaturesLoading] = useState(true);
  const [featuresError, setFeaturesError] = useState(false);

  // Analysis local state
  const [analysis, setAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);
  const [analysisError, setAnalysisError] = useState(false);

  // Get track data on mount
  useEffect(() => {
    let isSubscribed = true;

    // Fetch the basic track data
    async function fetchTrack() {
      if (isSubscribed) {
        setTrackError(false);
        setTrackLoading(true);
      }

      getTrack(trackId)
        .then((data) => {
          if (isSubscribed) {
            setTrack(data);
            setTrackLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setTrackLoading(false);
            setTrackError(true);
          }
        });
    }

    // Fetch the audio features of the track
    async function fetchAudioFeatures() {
      if (isSubscribed) {
        setFeaturesError(false);
        setFeaturesLoading(true);
      }

      getTrackFeatures(trackId)
        .then((data) => {
          if (isSubscribed) {
            setFeatures(data);
            setFeaturesLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setFeaturesError(true);
          }
        });
    }

    // Fetch the audio analysis of the track
    async function fetchAudioAnalysis() {
      if (isSubscribed) {
        setAnalysisError(false);
        setAnalysisLoading(true);
      }

      getTrackAnalysis(trackId)
        .then((data) => {
          if (isSubscribed) {
            setAnalysis(data);
            setAnalysisLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setAnalysisError(true);
          }
        });
    }

    fetchTrack();
    fetchAudioFeatures();
    fetchAudioAnalysis();

    return () => {
      isSubscribed = false;
    };
  }, [trackId]);

  // Redirect to artist page
  const onArtistClick = (artistId) => history.push(`/artist/${artistId}`);

  // Redirect to album page
  const onAlbumClick = (albumId) => history.push(`/album/${albumId}`);

  return (
    <main>
      <PageHeader heading="Track details" />
      <OverviewDetails
        loading={trackLoading}
        imageSrc={track?.album.images[0].url}
        heading={track?.name}
        spotifyUrl={track?.external_urls.spotify}
        error={trackError}
      >
        <div>
          {track &&
            track.artists.map(({ id: artistId, name: artistName }, i) => (
              <Fragment key={artistId}>
                <TrackArtist
                  onClick={() => onArtistClick(artistId)}
                >
                  {artistName}
                </TrackArtist>
                {track.artists.length > 0 && i === track.artists.length - 1
                  ? ''
                  : ','}
                &nbsp;
              </Fragment>
            ))}
        </div>
        {track && (
          <TrackAlbum>
            <span
              onClick={() => onAlbumClick(track.album.id)}
              role="presentation"
            >
              {track.album.name}
            </span>
            {` . ${getAlbumYear(track.album)}`}
          </TrackAlbum>
        )}
      </OverviewDetails>
      <Flex flexWrap="wrap">
        <Column padding="0px 16px 0px 0px">
          <AudioFeatures
            loading={featuresLoading}
            data={features}
            error={featuresError}
          />
        </Column>
        <Column isAnalysis padding="0px 16px 0px 16px">
          <AudioAnalysis
            loading={analysisLoading}
            error={analysisError}
            duration={track ? formatDuration(track.duration_ms) : ''}
            popularity={track ? track.popularity : 0}
            {...parseAnalysis(analysis)} /* eslint-disable-line */
          />
        </Column>
        <RelatedTracksColumn>
          <TrackRecommendations trackId={trackId} />
        </RelatedTracksColumn>
      </Flex>
    </main>
  );
};

export default TrackOverview;
