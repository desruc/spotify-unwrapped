import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectRecentlyPlayed } from '../store/reducer';

import Container from './Container';
import PageHeader from './PageHeader';
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

const RecentlyPlayed = () => {
  // Redux
  const tracks = useSelector((state) => selectRecentlyPlayed(state));

  return (
    <main>
      <Container>
        <PageHeader>Recently Played</PageHeader>
      </Container>
      <List>
        {tracks &&
          tracks.map(({ track }) => <Track key={track.id} track={track} />)}
      </List>
    </main>
  );
};

export default RecentlyPlayed;
