import React from 'react';

import TopArtists from './TopArtists';
import TopGenres from './TopGenres';
import TopAlbums from './TopAlbums';

const Dashboard = () => {
  return (
    <div>
      <TopGenres />
      <TopArtists />
      <TopAlbums />
    </div>
  );
};

export default Dashboard;
