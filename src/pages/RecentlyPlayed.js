import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectRecentlyPlayed, selectTopTracksLoading } from '../store/reducer';

import TopTracksLoading from '../components/Common/TopTracksLoading';
import PageHeader from '../components/Common/PageHeader';
import List from '../components/Common/List';
import Track from '../components/Common/Track';

import { getRecentlyPlayed } from '../store/actions';

import { randomId } from '../utils/helpers';

const RecentlyPlayed = () => {
  // Hooks
  const dispatch = useDispatch();

  // Redux
  const loading = useSelector((state) => selectTopTracksLoading(state));
  const tracks = useSelector((state) => selectRecentlyPlayed(state));

  // Update recently played on mount
  useEffect(() => {
    dispatch(getRecentlyPlayed());
  }, [dispatch, getRecentlyPlayed]);

  if (loading) return <TopTracksLoading heading="Recently Played" />;

  return (
    <main>
      <PageHeader heading="Recently Played" />
      <List twoColumns>
        {tracks &&
          tracks.map(({ track }) => <Track key={randomId()} track={track} />)}
      </List>
    </main>
  );
};

export default RecentlyPlayed;
