import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageHeader from '../components/PageHeader';

import { selectSelectedTrack } from '../store/reducer';

const TrackDetails = () => {
  // Hooks
  const dispatch = useDispatch();
  const { trackId } = useParams();

  // Redux
  const selectedTrack = useSelector((state) => selectSelectedTrack(state));

  // Get track if not in state
  useEffect(() => {
    if (trackId && !selectedTrack) {
      console.log('get track');
    }
  }, [trackId]);

  return <PageHeader heading="Track details" />;
};

export default TrackDetails;
