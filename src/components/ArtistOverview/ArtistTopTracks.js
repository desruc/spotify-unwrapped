import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ErrorMessage from '../Common/ErrorMessage';
import Flex from '../Common/Flex';
import TrackLoading from '../Common/TrackLoading';
import Track from '../Common/Track';

import { randomId } from '../../utils/helpers';

import { trackPropType } from '../../constants/types';

const Card = styled.div`
  height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  padding: 16px;
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

const ArtistTopTracks = ({ loading, error, topTracks }) => {
  const loadingJsx = [...new Array(10)].map(() => (
    <TrackLoading key={randomId()} />
  ));

  const tracksJsx = topTracks.map((track) => (
    <Track key={track.id} track={track} />
  ));

  return (
    <>
      <Heading>Popular Tracks</Heading>
      <Card>
        <Flex>
          {error ? (
            <ErrorMessage>
              There was an error retrieving the artists popular tracks.
            </ErrorMessage>
          ) : (
            <List>{loading ? loadingJsx : tracksJsx}</List>
          )}
        </Flex>
      </Card>
    </>
  );
};

ArtistTopTracks.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  topTracks: PropTypes.arrayOf(trackPropType),
};

ArtistTopTracks.defaultProps = {
  topTracks: [],
};

export default ArtistTopTracks;
