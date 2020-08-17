import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import AudioFeatures from '../components/AudioFeatures';

import { getTrackFeatures, getTrackAnalysis } from '../utils/spotify';

import { selectSelectedTrack } from '../store/reducer';

import { getTrack } from '../store/actions';

import { getArtist, getAlbumYear } from '../utils/helpers';

const ImageWrap = styled.div`
  width: 400px;
  display: inline-block;
  margin-right: 24px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
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
  font-size: 42px;
  margin-bottom: 5px;
  margin-top: 0;
`;

const TrackAritst = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.secondary};
`;

const TrackAlbum = styled.h4`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.tertiary};
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
`;

const TrackDetails = () => {
  // Hooks
  const dispatch = useDispatch();
  const { trackId } = useParams();

  // Local state
  const [features, setFeatures] = useState(null);
  const [featuresLoading, setFeaturesLoading] = useState(true);
  const [featuresError, setFeaturesError] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);
  const [analysisError, setAnalysisError] = useState(false);

  // Get audio features & analysis on mount
  useEffect(() => {
    let isSubscribed = true;

    async function fetchAudioFeatures() {
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
  }, []);

  // Redux
  const selectedTrack = useSelector((state) => selectSelectedTrack(state));

  // Get track if not in redux state
  useEffect(() => {
    if (
      (trackId && !selectedTrack) ||
      (selectedTrack && selectedTrack.id !== trackId)
    ) {
      dispatch(getTrack(trackId));
    }
  }, [trackId]);

  return (
    <main>
      <Container>
        <PageHeader heading="Track details" />
        <ImageWrap>
          {selectedTrack && <Image src={selectedTrack.album.images[0].url} />}
        </ImageWrap>
        <MetaWrap>
          {selectedTrack && <TrackTitle>{selectedTrack.name}</TrackTitle>}
          {selectedTrack && (
            <TrackAritst>{getArtist(selectedTrack)}</TrackAritst>
          )}
          {selectedTrack && (
            <TrackAlbum>{`${selectedTrack.album.name} . ${getAlbumYear(
              selectedTrack.album
            )}`}</TrackAlbum>
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
        {features && <AudioFeatures data={features} />}
      </Container>
    </main>
  );
};

export default TrackDetails;
