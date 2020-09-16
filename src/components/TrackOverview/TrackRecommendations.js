import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ErrorMessage from '../Common/ErrorMessage';
import Flex from '../Common/Flex';
import TrackLoading from '../Common/TrackLoading';
import Track from '../Common/Track';

import { getTrackRecommendations } from '../../spotify';
import { randomId } from '../../utils/helpers';

const Section = styled.section`
  flex: 1;
`;

const Card = styled.div`
  height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  padding: 16px;
  @media (min-width: 768px) {
    height: auto;
    min-height: 544px;
  }
`;

const Heading = styled.h2`
  margin-top: 0px;
`;

const List = styled.ul`
  flex: 1;
  transition: width 0.2s ease-in-out;
  margin: 0;
  padding: 0px;
  list-style: none;
  @media (min-width: 768px) {
    columns: 2;
  }
`;

const TrackRecommendations = ({ trackId }) => {
  // Local state
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(false);

  // Get recommendations on mount
  useEffect(() => {
    let isSubscribed = true;

    async function getRecommendations() {
      if (isSubscribed) {
        setLoading(true);
      }

      getTrackRecommendations(trackId)
        .then(({ tracks }) => {
          if (isSubscribed) {
            setRecommendations(tracks);
            setLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setLoading(false);
            setError(true);
          }
        });
    }

    getRecommendations();

    return () => {
      isSubscribed = false;
    };
  }, [trackId]);

  const loadingJsx = [...new Array(16)].map(() => (
    <TrackLoading key={randomId()} />
  ));

  const tracksJsx = recommendations.map((track) => (
    <Track key={track.id} track={track} />
  ));

  return (
    <Section>
      <Heading>Similar Tracks</Heading>
      <Card>
        <Flex alignItems="center" justifyContent="center" flex={1}>
          {error ? (
            <ErrorMessage>
              There was an error retrieving similar tracks.
            </ErrorMessage>
          ) : (
            <List>{loading ? loadingJsx : tracksJsx}</List>
          )}
        </Flex>
      </Card>
    </Section>
  );
};

TrackRecommendations.propTypes = {
  trackId: PropTypes.string.isRequired,
};

export default TrackRecommendations;
