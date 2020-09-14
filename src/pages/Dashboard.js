import React from 'react';
import { useSelector } from 'react-redux';

import DashboardLoading from '../components/Dashboard/DashboardLoading';

import PageHeader from '../components/Common/PageHeader';
import DashboardTracks from '../components/Dashboard/DashboardTracks';
import DashboardArtists from '../components/Dashboard/DashboardArtists';
import DashboardGenres from '../components/Dashboard/DashboardGenres';
import DashboardAlbums from '../components/Dashboard/DashboardAlbums';

import {
  selectTopArtistsLoading,
  selectTopTracksLoading,
} from '../store/reducer';

const Dashboard = () => {
  // Redux
  const tracksLoading = useSelector((state) => selectTopTracksLoading(state));
  const artistsLoading = useSelector((state) => selectTopArtistsLoading(state));

  if (tracksLoading || artistsLoading) return <DashboardLoading />;

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
