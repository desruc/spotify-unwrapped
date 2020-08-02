import React from 'react';

import TopArtists from './TopArtists';
import TopGenres from './TopGenres';

const Dashboard = () => {
  return (
    <div>
      <TopGenres />
      <TopArtists />
    </div>
  );
};

export default Dashboard;
