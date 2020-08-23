import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flex from './Flex';
import TrackLoading from './TrackLoading';
import Track from './Track';

import { randomId } from '../utils/helpers';

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

const Error = styled.h4`
  padding: 16px;
  text-align: center;
`;

const ArtistTopTracks = ({ loading, error, topTracks }) => {
  const loadingJsx = [...new Array(16)].map(() => (
    <TrackLoading key={randomId()} />
  ));

  const tracksJsx = topTracks.map((track) => (
    <Track key={track.id} track={track} />
  ));

  return (
    <>
      <Heading>Popular Tracks</Heading>
      <Card>
        <Flex fullWidth>
          {error ? (
            <Error>
              There was an error retrieving the artists popular tracks.
            </Error>
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
  topTracks: PropTypes.array,
};

ArtistTopTracks.defaultProps = {
  topTracks: [],
};

export default ArtistTopTracks;
