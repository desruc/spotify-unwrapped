import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DashboardLoading from '../components/Dashboard/DashboardLoading';

import PageHeader from '../components/Common/PageHeader';
import DashboardTracks from '../components/Dashboard/DashboardTracks';
import DashboardArtists from '../components/Dashboard/DashboardArtists';
import DashboardGenres from '../components/Dashboard/DashboardGenres';
import DashboardAlbums from '../components/Dashboard/DashboardAlbums';

import { getRecentlyPlayed } from '../store/actions';

import {
  selectTopArtistsLoading,
  selectTopTracksLoading,
} from '../store/reducer';

const Dashboard = () => {
  // Hooks
  const dispatch = useDispatch();

  // Redux
  const tracksLoading = useSelector((state) => selectTopTracksLoading(state));
  const artistsLoading = useSelector((state) => selectTopArtistsLoading(state));

  // Update recently played on mount
  useEffect(() => {
    dispatch(getRecentlyPlayed());
  }, [dispatch, getRecentlyPlayed]);

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
