import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import DashboardSectionWrap from './DashboardSectionWrap';
import Track from './Track';

import {
  selectTrackRange,
  selectRecentlyPlayed,
  selectTopTracks,
} from '../store/reducer';
import { CHANGE_TRACK_DATE_RANGE } from '../store/types';

const Section = styled.section`
  margin: 60px 0px;
  display: flex;
`;

const RecentlyPlayedWrap = styled.div`
  width: 25%;
  padding-right: 16px;
`;

const TopTracksWrap = styled.div`
  width: 75%;
`;

const List = styled.ul`
  transition: width 0.2s ease-in-out;
  margin: 0;
  padding: 0;
  list-style: none;
  ${({ twoColumns }) => twoColumns && 'columns: 2;'}
`;

const Wrap = styled.div`
  padding: 16px;
`;

const DashboardTracks = () => {
  // Redux
  const range = useSelector((state) => selectTrackRange(state));
  const recentlyPlayed = useSelector((state) => selectRecentlyPlayed(state));
  const topTracks = useSelector((state) => selectTopTracks(state));

  // Constants
  const computedTracks = topTracks[range];

  return (
    <Section>
      <RecentlyPlayedWrap>
        <DashboardSectionWrap
          id="recently-played"
          heading="Recently Played"
          seeMoreLink="/recently-played"
        >
          <Wrap>
            <List>
              {recentlyPlayed &&
                recentlyPlayed
                  .slice(0, 5)
                  .map(({ track }) => <Track key={track.id} track={track} />)}
            </List>
          </Wrap>
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
                .map((track) => <Track key={track.id} track={track} />)}
          </List>
        </DashboardSectionWrap>
      </TopTracksWrap>
    </Section>
  );
};

export default DashboardTracks;
