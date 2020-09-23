import React from 'react';
import PropTypes from 'prop-types';

import TrackListLoading from '../Common/TrackListLoading';
import List from '../Common/List';
import Track from '../Common/Track';
import ErrorMessage from '../Common/ErrorMessage';

import { trackPropType } from '../../constants/types';

const DiscoverRecommendations = ({ tracks, loading, error }) => {
  if (loading) return <TrackListLoading />;

  if (error)
    return (
      <ErrorMessage>
        There was an error retreiving your recommendations. Please refresh the
        page.
      </ErrorMessage>
    );

  return (
    <>
      <h4>Here are some recommendations based on your recent activity</h4>
      <List twoColumns>
        {tracks.map((track) => (
          <Track track={track} />
        ))}
      </List>
    </>
  );
};

DiscoverRecommendations.propTypes = {
  tracks: PropTypes.arrayOf(trackPropType).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default DiscoverRecommendations;
