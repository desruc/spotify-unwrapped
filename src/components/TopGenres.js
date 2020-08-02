import React from 'react';
import { useSelector } from 'react-redux';

import { selectTopAristsAllTime } from '../store/reducer';

import { getTopGenres } from '../utils/helpers';

const TopGenres = () => {
  const allTime = useSelector((state) => selectTopAristsAllTime(state));

  const genres = getTopGenres(allTime);

  return (
    <div>
      <h2>Top Genres</h2>
      {genres && genres.slice(0, 9).map((g) => {
        const [key, value] = g;
        return <div>{`${key} - ${value}`}</div>;
      })}
    </div>
  );
};

export default TopGenres;
