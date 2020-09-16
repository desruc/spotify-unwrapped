import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from './PageHeader';
import List from './List';
import TrackLoading from './TrackLoading';

import { randomId } from '../../utils/helpers';

const TopTracksLoading = ({ heading }) => (
  <main>
    <PageHeader heading={heading} />
    <List twoColumns>
      {[...new Array(50)].map(() => (
        <TrackLoading key={randomId()} />
      ))}
    </List>
  </main>
);

TopTracksLoading.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default TopTracksLoading;
