import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  getTopAlbums,
  getTopGenres,
  getTrackWithArtist,
} from '../utils/helpers';

import {
  selectTopArtists,
  selectTopTracks,
  selectRange,
} from '../store/reducer';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StatWrap = styled.div`
  width: 25%;
`;

const Heading = styled.h1`
  margin: 0;
`;

const SubHeading = styled.h3`
  margin: 0;
`;

const Overview = () => {
  // Redux
  const range = useSelector((state) => selectRange(state));
  const topArtists = useSelector((state) => selectTopArtists(state));
  const topTracks = useSelector((state) => selectTopTracks(state));

  const computedArtists = topArtists[range];
  const computedTracks = topTracks[range];

  const topAlbums = getTopAlbums(computedTracks);
  const topGenres = getTopGenres(computedArtists);
  const computedTopAlbum = topAlbums ? topAlbums[0][0].name : null;
  const computedTopGenre = topGenres ? topGenres[0][0] : null;

  return (
    <section>
      <Heading>At A Glance</Heading>
      <Flex>
        <StatWrap>
          <SubHeading>Top Artist</SubHeading>
          {computedArtists && computedArtists[0].name}
        </StatWrap>
        <StatWrap>
          <SubHeading>Top Track</SubHeading>
          {computedTracks && getTrackWithArtist(computedTracks[0])}
        </StatWrap>
        <StatWrap>
          <SubHeading>Top Album</SubHeading>
          {computedTopAlbum}
        </StatWrap>
        <StatWrap>
          <SubHeading>Top Genre</SubHeading>
          {computedTopGenre}
        </StatWrap>
      </Flex>
    </section>
  );
};

export default Overview;
