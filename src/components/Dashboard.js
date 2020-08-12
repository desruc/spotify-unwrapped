import React from 'react';

import Container from './Container';

import PageHeader from './PageHeader';
import DashboardTracks from './DashboardTracks';
import DashboardArtists from './DashboardArtists';
import DashboardGenres from './DashboardGenres';
import DashboardAlbums from './DashboardAlbums';

const Dashboard = () => {
  return (
    <Container>
      <PageHeader>Dashboard</PageHeader>
      <DashboardTracks />
      <DashboardArtists />
      <DashboardAlbums />
      <DashboardGenres />
    </Container>
  );
};

export default Dashboard;
