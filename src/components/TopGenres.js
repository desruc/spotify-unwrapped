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

const Column = styled.div`
  width: 50%;
`;

const Bar = styled.div`
  border-radius: 6px;
  border: 1px solid #000000;
  height: 50px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const BarFill = styled.div`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.main};
  transition: width 0.2s ease-in-out;
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
        <Column>
          {genres &&
            genres.slice(0, 5).map((g, idx) => {
              const [key, value] = g;
              const highestValue = genres[0][1];
              const fillwidth = idx === 0 ? 100 : (value / highestValue) * 100;
              return (
                <div>
                  <Bar>
                    <BarFill width={fillwidth} />
                  </Bar>
                  <span>{key}</span>
                </div>
              );
            })}
        </Column>
        <Column>
          {genres &&
            genres.slice(5).map((g) => {
              const [key] = g;
              return <span>{key}</span>;
            })}
        </Column>
      </Flex>
    </Section>
  );
};

export default TopGenres;
