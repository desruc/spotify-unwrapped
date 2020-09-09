import React from 'react';
import { useSelector } from 'react-redux';

import PageHeader from '../components/PageHeader';
import DashboardTracks from '../components/Dashboard/DashboardTracks';
import DashboardArtists from '../components/Dashboard/DashboardArtists';
import DashboardGenres from '../components/Dashboard/DashboardGenres';
import DashboardAlbums from '../components/Dashboard/DashboardAlbums';

const Dashboard = () => {
  return (
    <main>
      <PageHeader heading="Dashboard" />
      <DashboardTracks />
      <DashboardArtists />
      <DashboardAlbums />
      <DashboardGenres />
    </main>
  );
};

export default Dashboard;
