import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Flex from './Flex';
import RangeSelector from './RangeSelector';

import { CHANGE_GENRE_DATE_RANGE } from '../store/types';
import { selectGenreRange, selectTopArtists } from '../store/reducer';

import { getTopGenres } from '../utils/helpers';

const Section = styled.section`
  margin: 60px 0px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin: 0px;
  flex: 1;
`;

const TopFiveWrap = styled.div`
  width: 33.33333333333333%;
`;

const GenreHeading = styled.h3`
  margin-top: 0px;
  margin-bottom: 8px;
`;

const MoreGenresWrap = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  width: calc(66.66666666666667% - 32px);
`;

const Bar = styled.div`
  border-radius: 6px;
  border: 1px solid #eaeaea;
  height: 40px;
  width: 100%;
  margin-bottom: 16px;
`;

const BarFill = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  width: ${({ width }) => width}%;
  height: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.main};
  transition: width 0.2s ease-in-out;
`;

const Chip = styled.div`
  padding: 8px 16px;
  border-radius: 25px;
  margin: 5px;
  background-color: #eaeaea;
  display: inline-block;
  font-size: 12px;
`;

const TopGenres = () => {
  // Redux
  const range = useSelector((state) => selectGenreRange(state));
  const artists = useSelector((state) => selectTopArtists(state));

  // Constants
  const computedArtists = artists[range];
  const genres = getTopGenres(computedArtists);

  return (
    <Section>
      <Flex alignCenter mb={20}>
        <Heading>Top Genres</Heading>
        <RangeSelector type={CHANGE_GENRE_DATE_RANGE} value={range} />
      </Flex>
      <Flex>
        <TopFiveWrap width={25}>
          {genres &&
            genres.slice(0, 5).map((g, idx) => {
              const [key, value] = g;
              const highestValue = genres[0][1];
              const fillwidth = idx === 0 ? 100 : (value / highestValue) * 100;
              return (
                <div>
                  <GenreHeading>{key}</GenreHeading>
                  <Bar>
                    <BarFill width={fillwidth} />
                  </Bar>
                </div>
              );
            })}
        </TopFiveWrap>
        <MoreGenresWrap width={75}>
          {genres &&
            genres.slice(5).map((g) => {
              const [key] = g;
              return <Chip>{key}</Chip>;
            })}
        </MoreGenresWrap>
      </Flex>
    </Section>
  );
};

export default TopGenres;
