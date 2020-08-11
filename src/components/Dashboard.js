import React from 'react';

import Container from './Container';

import PageHeader from './PageHeader';
import RecentlyPlayed from './RecentlyPlayed';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import TopGenres from './TopGenres';
import TopAlbums from './TopAlbums';

const Dashboard = () => {
  return (
    <Container>
      <PageHeader>Dashboard</PageHeader>
      <RecentlyPlayed />
      <TopTracks />
      <TopArtists />
      <TopAlbums />
      <TopGenres />
    </Container>
  );
};

export default Dashboard;
