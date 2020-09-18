import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../Common/ErrorMessage';
import Card from '../Common/Card';
import List from '../Common/List';
import TrackLoading from '../Common/TrackLoading';
import Track from '../Common/Track';

import { randomId } from '../../utils/helpers';

import { trackPropType } from '../../constants/types';

const ArtistTopTracks = ({ loading, error, topTracks }) => {
  const loadingJsx = [...new Array(10)].map(() => (
    <TrackLoading key={randomId()} />
  ));

  const tracksJsx = topTracks.map((track) => (
    <Track key={track.id} track={track} />
  ));

  return (
    <>
      <h2>Popular Tracks</h2>
      <Card>
        {error ? (
          <ErrorMessage>
            There was an error retrieving the artists popular tracks.
          </ErrorMessage>
        ) : (
          <List twoColumns>{loading ? loadingJsx : tracksJsx}</List>
        )}
      </Card>
    </>
  );
};

ArtistTopTracks.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  topTracks: PropTypes.arrayOf(trackPropType),
};

ArtistTopTracks.defaultProps = {
  topTracks: [],
};

export default ArtistTopTracks;
