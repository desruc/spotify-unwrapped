import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ErrorMessage from '../Common/ErrorMessage';
import Card from '../Common/Card';
import Flex from '../Common/Flex';
import TrackLoading from '../Common/TrackLoading';
import Track from '../Common/Track';

import { getTrackRecommendations } from '../../spotify';
import { randomId } from '../../utils/helpers';

const Section = styled.section`
  flex: 1;
`;

const StyledCard = styled(Card)`
  @media (min-width: 768px) {
    height: auto;
    min-height: 544px;
  }
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
      <h2>Similar Tracks</h2>
      <StyledCard>
        <Flex alignItems="center" justifyContent="center" flex={1}>
          {error ? (
            <ErrorMessage>
              There was an error retrieving similar tracks.
            </ErrorMessage>
          ) : (
            <List>{loading ? loadingJsx : tracksJsx}</List>
          )}
        </Flex>
      </StyledCard>
    </Section>
  );
};

TrackRecommendations.propTypes = {
  trackId: PropTypes.string.isRequired,
};

export default TrackRecommendations;
