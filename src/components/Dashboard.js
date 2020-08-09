import React from 'react';

import Container from './Container';

import PageHeader from './PageHeader';
import RecentlyListened from './RecentlyListened';
import TopArtists from './TopArtists';
import TopGenres from './TopGenres';
import TopAlbums from './TopAlbums';

const Dashboard = () => {
  return (
    <Container>
      <PageHeader>Dashboard</PageHeader>
      <RecentlyListened />
      <TopArtists />
      <TopAlbums />
      <TopGenres />
    </Container>
  );
};

export default Dashboard;
