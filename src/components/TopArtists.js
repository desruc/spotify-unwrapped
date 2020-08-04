import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  selectRange,
  selectTopAristsAllTime,
  selectTopArtistsHalfYear,
  selectTopArtistsMonth,
} from '../store/reducer';

import SlideToggleContent from './SlideToggleContent';
import Button from './Button';

const Heading = styled.h2`
  margin: 0;
`;

const ArtistImage = styled.div`
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  border-radius: 6px;
  background-size: cover;
  background-position: center top;
  background-image: url(${({ image }) => image});
  margin: ${({ topArtist }) => (topArtist ? '0px' : '5px')};
  position: relative;
  transition: all 0.2s ease-in-out;
  &:hover {
    // transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }
`;

const ArtistName = styled.h1`
  user-select: none;
  z-index: 1;
  color: #ffffff;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justifyCenter }) =>
    justifyCenter ? 'center' : 'flex-start'};
  align-items: ${({ alignCenter }) => (alignCenter ? 'center' : 'flex-start')};
`;

const TopArtistWrap = styled.div`
  height: 400px;
  flex-basis: 20%;
  display: flex;
  justify-content: center;
`;

const TopArtistImage = styled.div`
  height: 100%;
  width: calc(100% - 10px);
  border-radius: 6px;
  background-size: cover;
  background-position: center top;
  background-image: url(${({ image }) => image});
  margin: ${({ topArtist }) => (topArtist ? '0px' : '5px')};
  position: relative;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }
`;

const ArtistWrap = styled.div`
  height: 200px;
  flex-basis: 10%;
  display: flex;
  justify-content: center;
`;

const TopArtists = () => {
  // Local
  const [showAll, setShowAll] = useState(false);

  // Redux
  const range = useSelector((state) => selectRange(state));
  const allTime = useSelector((state) => selectTopAristsAllTime(state));
  const halfYear = useSelector((state) => selectTopArtistsHalfYear(state));
  const month = useSelector((state) => selectTopArtistsMonth(state));

  // Event handlers
  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  // Constants
  const artists = {
    allTime,
    halfYear,
    month,
  };

  const computedArtists = artists[range];

  return (
    <section>
      <Heading>Top Artists</Heading>
      <Flex>
        {computedArtists &&
          computedArtists.slice(0, 5).map((a) => (
            <TopArtistWrap>
              <TopArtistImage key={a.id} image={a.images[0].url} topArtist>
                <ArtistName>{a.name}</ArtistName>
              </TopArtistImage>
            </TopArtistWrap>
          ))}
      </Flex>
      <SlideToggleContent isVisible={showAll}>
        <Flex>
          {computedArtists &&
            computedArtists.slice(5).map((a) => (
              <ArtistWrap>
                <ArtistImage key={a.id} image={a.images[0].url}>
                  <ArtistName>{a.name}</ArtistName>
                </ArtistImage>
              </ArtistWrap>
            ))}
        </Flex>
      </SlideToggleContent>
      <Flex justifyCenter alignCenter style={{ marginTop: 20 }}>
        <Button onClick={handleShowAll}>
          {showAll ? 'Show less' : 'Show more'}
        </Button>
      </Flex>
    </section>
  );
};

export default TopArtists;
