import React from 'react';

import Container from './Container';

import Overview from './Overview';
import TopArtists from './TopArtists';
import TopGenres from './TopGenres';
import TopAlbums from './TopAlbums';

const Dashboard = () => {
  return (
    <Container>
      <Overview />
      <TopArtists />
      <TopAlbums />
      <TopGenres />
    </Container>
  );
};

export default Dashboard;
