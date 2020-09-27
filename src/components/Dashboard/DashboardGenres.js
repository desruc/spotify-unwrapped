import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Flex from '../Common/Flex';
import DashboardSectionWrap from './DashboardSectionWrap';

import { CHANGE_GENRE_DATE_RANGE } from '../../store/types';
import { selectGenreRange, selectTopArtists } from '../../store/reducer';

import { getTopGenres } from '../../utils/helpers';

const TopFiveWrap = styled.div`
  width: 100%;
  @media (min-width: 1200px) {
    width: 33.33333333333333%;
  }
`;

const GenreHeading = styled.h3`
  margin-top: 0px;
  margin-bottom: 8px;
`;

const MoreGenresWrap = styled.div`
  width: 100%;
  @media (min-width: 1200px) {
    padding-left: 16px;
    width: 66.66666666666667%;
  }
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

const DashboardGenres = () => {
  // Redux
  const range = useSelector((state) => selectGenreRange(state));
  const artists = useSelector((state) => selectTopArtists(state));

  // Constants
  const computedArtists = artists[range];
  const genres = getTopGenres(computedArtists);

  return (
    <DashboardSectionWrap
      id="top-genres"
      heading="Top Genres"
      showRange
      actionType={CHANGE_GENRE_DATE_RANGE}
      selectedRange={range}
    >
      <Flex flexWrap="wrap">
        <TopFiveWrap width={25}>
          <h5>Your favourite genres</h5>
          {genres &&
            genres.slice(0, 5).map((g, idx) => {
              const [key, value] = g;
              const highestValue = genres[0][1];
              const fillwidth = idx === 0 ? 100 : (value / highestValue) * 100;
              return (
                <React.Fragment key={key}>
                  <GenreHeading>{key}</GenreHeading>
                  <Bar>
                    <BarFill width={fillwidth} />
                  </Bar>
                </React.Fragment>
              );
            })}
        </TopFiveWrap>
        <MoreGenresWrap width={75}>
          <h5>More of your favourite genres</h5>
          <Flex flexWrap="wrap" justifyContent="center">
            {genres &&
              genres.slice(5).map((g) => {
                const [key] = g;
                return <Chip key={key}>{key}</Chip>;
              })}
          </Flex>
        </MoreGenresWrap>
      </Flex>
    </DashboardSectionWrap>
  );
};

export default DashboardGenres;
