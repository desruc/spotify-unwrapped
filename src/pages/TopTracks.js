import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectTopTracks, selectTrackRange } from '../store/reducer';
import { CHANGE_TRACK_DATE_RANGE } from '../store/types';

import PageHeader from '../components/PageHeader';
import RangeTabs from '../components/RangeTabs';
import Track from '../components/Track';

const List = styled.ul`
  transition: width 0.2s ease-in-out;
  margin: 0;
  padding: 0px;
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

  const headerActions = (
    <RangeTabs actionType={CHANGE_TRACK_DATE_RANGE} selected={range} />
  );

  return (
    <main>
      <PageHeader heading="Top Tracks" actions={headerActions} />
      <List>
        {computedTracks &&
          computedTracks.map((track) => <Track key={track.id} track={track} />)}
      </List>
    </main>
  );
};

export default TopTracksPage;
