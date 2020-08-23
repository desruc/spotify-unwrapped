import React from 'react';

import Container from '../components/Container';

import PageHeader from '../components/PageHeader';
import DashboardTracks from '../components/DashboardTracks';
import DashboardArtists from '../components/DashboardArtists';
import DashboardGenres from '../components/DashboardGenres';
import DashboardAlbums from '../components/DashboardAlbums';

const Dashboard = () => {
  return (
    <Container>
      <PageHeader heading="Dashboard" />
      <DashboardTracks />
      <DashboardArtists />
      <DashboardAlbums />
      <DashboardGenres />
    </Container>
  );
};

export default Dashboard;
