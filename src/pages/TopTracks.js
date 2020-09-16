import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectTopTracks,
  selectTrackRange,
  selectTopTracksLoading,
} from '../store/reducer';
import { CHANGE_TRACK_DATE_RANGE } from '../store/types';

import TopTracksLoading from '../components/Common/TopTracksLoading';
import PageHeader from '../components/Common/PageHeader';
import RangeTabs from '../components/Common/RangeTabs';
import List from '../components/Common/List';
import Track from '../components/Common/Track';

const TopTracksPage = () => {
  // Redux
  const loading = useSelector((state) => selectTopTracksLoading(state));
  const range = useSelector((state) => selectTrackRange(state));
  const tracks = useSelector((state) => selectTopTracks(state));

  // Constants
  const computedTracks = tracks[range];

  const headerActions = (
    <RangeTabs actionType={CHANGE_TRACK_DATE_RANGE} selected={range} />
  );

  if (loading) return <TopTracksLoading heading="Top Tracks" />;

  return (
    <main>
      <PageHeader heading="Top Tracks" actions={headerActions} />
      <List twoColumns>
        {computedTracks &&
          computedTracks.map((track) => <Track key={track.id} track={track} />)}
      </List>
    </main>
  );
};

export default TopTracksPage;
