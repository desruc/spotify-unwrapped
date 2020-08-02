import React from 'react';
import { useSelector } from 'react-redux';

import { selectTopAristsAllTime } from '../store/reducer';

import { getTopGenres } from '../utils/helpers';

const TopGenres = () => {
  const allTime = useSelector((state) => selectTopAristsAllTime(state));

  getTopGenres(allTime);

  return <div>Top Genres</div>;
};

export default TopGenres;
