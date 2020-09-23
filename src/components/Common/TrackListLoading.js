import React from 'react';

import List from './List';
import TrackLoading from './TrackLoading';

import { randomId } from '../../utils/helpers';

const TrackListLoading = () => (
  <List twoColumns>
    {[...new Array(50)].map(() => (
      <TrackLoading key={randomId()} />
    ))}
  </List>
);

export default TrackListLoading;
