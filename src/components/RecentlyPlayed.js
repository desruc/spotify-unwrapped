import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import DashboardSectionWrap from './DashboardSectionWrap';
import Track from './Track';

import { selectRecentlyPlayed } from '../store/reducer';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 992px) {
    columns: 2;
  }
`;

const Wrap = styled.div`
  padding: 16px;
`;

const RecentlyPlayed = () => {
  // Redux
  const recentlyPlayed = useSelector((state) => selectRecentlyPlayed(state));

  return (
    <DashboardSectionWrap
      id="recently-played"
      heading="Recently Played"
      seeMoreLink="/recently-played"
    >
      <Wrap>
        <List>
          {recentlyPlayed &&
            recentlyPlayed
              .slice(0, 10)
              .map(({ track }) => <Track key={track.id} track={track} />)}
        </List>
      </Wrap>
    </DashboardSectionWrap>
  );
};

export default RecentlyPlayed;
