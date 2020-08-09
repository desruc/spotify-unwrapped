import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Track from './Track';

import { selectRecentlyPlayed } from '../store/reducer';

const Section = styled.section`
  margin: 60px 0px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin: 0px;
  flex: 1;
  margin-bottom: 20px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 992px) {
    columns: 2;
  }
`;

const RecentlyPlayed = () => {
  // Redux
  const recentlyPlayed = useSelector((state) => selectRecentlyPlayed(state));

  return (
    <Section>
      <Heading>Recently Played</Heading>
      <List>
        {recentlyPlayed &&
          recentlyPlayed
            .slice(0, 10)
            .map(({ track }) => <Track key={track.id} track={track} />)}
      </List>
    </Section>
  );
};

export default RecentlyPlayed;
