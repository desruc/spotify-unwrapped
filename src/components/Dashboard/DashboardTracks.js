import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Flex from '../Common/Flex';
import DashboardSectionWrap from './DashboardSectionWrap';
import List from '../Common/List';
import Track from '../Common/Track';

import {
  selectTrackRange,
  selectRecentlyPlayed,
  selectTopTracks,
} from '../../store/reducer';
import { CHANGE_TRACK_DATE_RANGE } from '../../store/types';

import { randomId } from '../../utils/helpers';

const RecentlyPlayedWrap = styled.div`
  width: 100%;
  @media (min-width: 1400px) {
    padding-right: 16px;
    width: 25%;
  }
`;

const TopTracksWrap = styled.div`
  width: 100%;
  @media (min-width: 1400px) {
    width: 75%;
  }
`;

const DashboardTracks = () => {
  // Redux
  const range = useSelector((state) => selectTrackRange(state));
  const recentlyPlayed = useSelector((state) => selectRecentlyPlayed(state));
  const topTracks = useSelector((state) => selectTopTracks(state));

  // Constants
  const computedTracks = topTracks[range];

  return (
    <Flex flexWrap="wrap">
      <RecentlyPlayedWrap>
        <DashboardSectionWrap
          id="recently-played"
          heading="Recently Played"
          seeMoreLink="/recently-played"
        >
          <List>
            {recentlyPlayed &&
              recentlyPlayed
                .slice(0, 5)
                .map(({ track }) => <Track key={randomId()} track={track} />)}
          </List>
        </DashboardSectionWrap>
      </RecentlyPlayedWrap>
      <TopTracksWrap>
        <DashboardSectionWrap
          id="top-tracks"
          heading="Top Tracks"
          showRange
          actionType={CHANGE_TRACK_DATE_RANGE}
          selectedRange={range}
          seeMoreLink="/top-tracks"
        >
          <List twoColumns>
            {computedTracks &&
              computedTracks
                .slice(0, 10)
                .map((track) => <Track key={randomId()} track={track} />)}
          </List>
        </DashboardSectionWrap>
      </TopTracksWrap>
    </Flex>
  );
};

export default DashboardTracks;
