import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import Flex from '../components/Flex';
import AudioAnalysis from '../components/AudioAnalysis';
import AudioFeatures from '../components/AudioFeatures';
import TrackRecommendations from '../components/TrackRecommendations';

import { getTrackFeatures, getTrackAnalysis } from '../utils/spotify';

import { selectSelectedTrack, selectTrackLoading } from '../store/reducer';

import { getTrack } from '../store/actions';

import { getAlbumYear, formatDuration, parseAnalysis } from '../utils/helpers';

const ImageWrap = styled.div`
  width: 300px;
  margin-right: 24px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  display: flex;
  align-items: flex-start;
`;

const Image = styled.img`
  height: auto;
  width: 100%;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 6px;
`;

const MetaWrap = styled.div`
  display: inline-block;
`;

const TrackTitle = styled.h2`
  line-height: 1;
  font-size: 42px;
  margin-bottom: 5px;
  margin-top: 0;
`;

const TrackArtist = styled.h3`
  display: inline-block;
  cursor: pointer;
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.secondary};
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.main};
  }
`;

const TrackAlbum = styled.h4`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.tertiary};
  & span {
    cursor: pointer;
  }
`;

const Button = styled.a`
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  display: block;
  background-color: ${({ theme }) => theme.main};
  color: #ffffff;
  font-weight: 700;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  width: fit-content;
`;

const TrackInfo = styled.div`
  margin-right: -16px;
  margin-left: -16px;
  display: flex;
  flex-wrap: wrap;
`;

const Column = styled.div`
  width: 100%;
  padding: 0px 16px;
  @media (min-width: 768px) {
    width: calc(50% - 32px);
  }
  @media (min-width: 992px) {
    width: calc(25% - 32px);
  }
`;

const RelatedTracksColumn = styled.div`
  width: 100%;
  padding: 0px 16px;
  @media (min-width: 992px) {
    width: calc(50% - 32px);
  }
`;

const TrackDetails = () => {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const { trackId } = useParams();

  // Local state
  const [features, setFeatures] = useState(null);
  const [featuresLoading, setFeaturesLoading] = useState(true);
  const [featuresError, setFeaturesError] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);
  const [analysisError, setAnalysisError] = useState(false);

  // Redux
  const trackLoading = useSelector((state) => selectTrackLoading(state));
  const selectedTrack = useSelector((state) => selectSelectedTrack(state));

  // Get audio features & analysis on mount
  useEffect(() => {
    let isSubscribed = true;

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

    fetchAudioFeatures();
    fetchAudioAnalysis();

    return () => {
      isSubscribed = false;
    };
  }, [trackId]);

  // Get track if not in redux state
  useEffect(() => {
    if (
      (trackId && !selectedTrack) ||
      (selectedTrack && selectedTrack.id !== trackId)
    ) {
      dispatch(getTrack(trackId));
    }
  }, [trackId]);

  // Redirect to artist page
  const onArtistClick = (artistId) => history.push(`/artist/${artistId}`);

  // Redirect to album page
  const onAlbumClick = (albumId) => history.push(`/album/${albumId}`);

  return (
    <main>
      <Container>
        <PageHeader heading="Track details" />
        <Flex mb={40} wrap>
          <ImageWrap loading={trackLoading ? 1 : 0}>
            {selectedTrack && <Image src={selectedTrack.album.images[0].url} />}
          </ImageWrap>
          <MetaWrap>
            {selectedTrack && <TrackTitle>{selectedTrack.name}</TrackTitle>}
            <div>
              {selectedTrack &&
                selectedTrack.artists.map(
                  ({ id: artistId, name: artistName }, i) => (
                    <TrackArtist
                      key={artistId}
                      onClick={() => onArtistClick(artistId)}
                    >
                      {artistName}
                      {selectedTrack.artists.length > 0 &&
                      i === selectedTrack.artists.length - 1
                        ? ''
                        : ','}
                      &nbsp;
                    </TrackArtist>
                  )
                )}
            </div>
            {selectedTrack && (
              <TrackAlbum>
                <span
                  onClick={() => onAlbumClick(selectedTrack.album.id)}
                  role="presentation"
                >
                  {selectedTrack.album.name}
                </span>
                {` . ${getAlbumYear(selectedTrack.album)}`}
              </TrackAlbum>
            )}
            {selectedTrack && (
              <Button
                href={selectedTrack.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                Play on Spotify
              </Button>
            )}
          </MetaWrap>
        </Flex>
        <TrackInfo>
          <Column>
            <AudioFeatures
              loading={featuresLoading}
              data={features}
              error={featuresError}
            />
          </Column>
          <Column>
            <AudioAnalysis
              loading={analysisLoading}
              error={analysisError}
              duration={
                selectedTrack ? formatDuration(selectedTrack.duration_ms) : ''
              }
              popularity={selectedTrack ? selectedTrack.popularity : 0}
              {...parseAnalysis(analysis)} /* eslint-disable-line */
            />
          </Column>
          <RelatedTracksColumn>
            <TrackRecommendations trackId={trackId} />
          </RelatedTracksColumn>
        </TrackInfo>
      </Container>
    </main>
  );
};

export default TrackDetails;
