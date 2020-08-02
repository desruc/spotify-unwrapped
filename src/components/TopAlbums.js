import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectTopTracksAllTime } from '../store/reducer';

import { getTopAlbums } from '../utils/helpers';

const AlbumImage = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 6px;
  background-size: cover;
  background-position: center center;
  background-image: url(${({ image }) => image});
  display: inline-block;
`;

const TopAlbums = () => {
  const allTime = useSelector((state) => selectTopTracksAllTime(state));

  const albums = getTopAlbums(allTime);

  return (
    <div>
      <h2>Top Albums</h2>
      {albums &&
        albums.map((a) => {
          const [album] = a;
          return <AlbumImage image={album.images[0].url} />;
        })}
    </div>
  );
};

export default TopAlbums;
