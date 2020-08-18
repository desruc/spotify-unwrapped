import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flex from './Flex';
import Track from './Track';

import { getTrackRecommendations } from '../spotify';

const Card = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
`;

const Heading = styled.h2`
  margin-top: 0px;
`;

const List = styled.ul`
  transition: width 0.2s ease-in-out;
  margin: 0;
  padding: 0px 26px;
  list-style: none;
  width: 100%;
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

  return (
    <section>
      <Heading>Recommendations</Heading>
      <Card>
        <Flex align="center" justify="center">
          <List>
            {recommendations.map((track) => (
              <Track track={track} />
            ))}
          </List>
        </Flex>
      </Card>
    </section>
  );
};

TrackRecommendations.propTypes = {
  trackId: PropTypes.string.isRequired,
};

export default TrackRecommendations;
