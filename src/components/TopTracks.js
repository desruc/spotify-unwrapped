import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectTopTracks, selectTrackRange } from '../store/reducer';
import { CHANGE_TRACK_DATE_RANGE } from '../store/types';

import DashboardSectionWrap from './DashboardSectionWrap';
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

const TopTracks = () => {
  // Redux
  const range = useSelector((state) => selectTrackRange(state));
  const tracks = useSelector((state) => selectTopTracks(state));

  // Constants
  const computedTracks = tracks[range];

  return (
    <DashboardSectionWrap
      id="top-tracks"
      heading="Top Tracks"
      showRange
      actionType={CHANGE_TRACK_DATE_RANGE}
      selectedRange={range}
      seeMoreLink="/top-tracks"
    >
      <List>
        {computedTracks &&
          computedTracks
            .slice(0, 10)
            .map((track) => <Track key={track.id} track={track} />)}
      </List>
    </DashboardSectionWrap>
  );
};

export default TopTracks;
