import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectTopTracks, selectTrackRange } from '../store/reducer';

import Track from './Track';

const List = styled.ul`
  transition: width 0.2s ease-in-out;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 992px) {
    columns: 2;
  }
`;

const TopTracksPage = () => {
  // Redux
  const range = useSelector((state) => selectTrackRange(state));
  const tracks = useSelector((state) => selectTopTracks(state));

  // Constants
  const computedTracks = tracks[range];

  return (
    <List>
      {computedTracks &&
        computedTracks.map((track) => <Track key={track.id} track={track} />)}
    </List>
  );
};

export default TopTracksPage;
