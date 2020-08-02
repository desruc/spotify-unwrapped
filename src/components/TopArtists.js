import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  selectRange,
  selectTopAristsAllTime,
  selectTopArtistsHalfYear,
  selectTopArtistsMonth,
} from '../store/reducer';

const Heading = styled.h2`
  margin: 0;
`;

const ArtistImage = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 6px;
  background-size: cover;
  background-position: center center;
  background-image: url(${({ image }) => image});
  display: inline-block;
`;

const TopArtists = () => {
  // Redux
  const range = useSelector((state) => selectRange(state));
  const allTime = useSelector((state) => selectTopAristsAllTime(state));
  const halfYear = useSelector((state) => selectTopArtistsHalfYear(state));
  const month = useSelector((state) => selectTopArtistsMonth(state));

  // Constants
  const artists = {
    allTime,
    halfYear,
    month,
  };

  const computedArtists = artists[range];

  return (
    <div>
      <Heading>Top Artists</Heading>
      {computedArtists &&
        computedArtists.map((a) => (
          <ArtistImage key={a.id} image={a.images[0].url} />
        ))}
    </div>
  );
};

export default TopArtists;
