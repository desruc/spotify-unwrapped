import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectAristRange, selectTopArtists } from '../store/reducer';
import { CHANGE_ARTIST_DATE_RANGE } from '../store/types';

import SlideToggleContent from './SlideToggleContent';
import Button from './Button';

import { useWindowSize } from '../utils/hooks';
import RangeSelector from './RangeSelector';

const Heading = styled.h1`
  font-size: 2rem;
  margin: 0px;
  flex: 1;
`;

const TopArtistWrap = styled.div`
  display: flex;
  justify-content: center;
  height: 170px;
  flex-basis: 50%;
  @media (min-width: 768px) {
    height: 330px;
    flex-basis: 33.33333333333333%;
  }
  @media (min-width: 992px) {
    flex-basis: 25%;
  }
`;

const ArtistWrap = styled.div`
  display: flex;
  justify-content: center;
  height: 170px;
  flex-basis: 50%;
  @media (min-width: 768px) {
    flex-basis: 25%;
  }
  @media (min-width: 992px) {
    height: 200px;
    flex-basis: 14.28571428571429%;
  }
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
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

const ArtistNameHover = styled.div`
  position: absolute;
  top: 0;
  height: calc(100% - 32px);
  width: calc(100% - 32px);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 1;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  min-width: 0;
  &:hover {
    opacity: 1;
  }
`;

const ArtistName = styled.h1`
  user-select: none;
  z-index: 1;
  color: #ffffff;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justifyCenter }) =>
    justifyCenter ? 'center' : 'flex-start'};
  align-items: ${({ alignCenter }) => (alignCenter ? 'center' : 'flex-start')};
`;

const getViewport = (width) => {
  if (width < 768) return 'mobile';
  if (width < 992) return 'tablet';
  return 'desktop';
};

const TopArtists = () => {
  // Hooks
  const { width: viewportWidth } = useWindowSize();

  // Local
  const [showAll, setShowAll] = useState(false);

  // Redux
  const range = useSelector((state) => selectAristRange(state));
  const artists = useSelector((state) => selectTopArtists(state));

  // Event handlers
  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  // Constants
  const sliceRange = {
    mobile: 4,
    tablet: 6,
    desktop: 8,
  };
  const computedArtists = artists[range];
  const computedSlice = sliceRange[getViewport(viewportWidth)];

  return (
    <section>
      <Flex alignCenter style={{ marginBottom: 20 }} id="topArtistsContainer">
        <Heading>Top Artists</Heading>
        <RangeSelector type={CHANGE_ARTIST_DATE_RANGE} value="allTime" />
      </Flex>
      <Flex>
        {computedArtists &&
          computedArtists.slice(0, computedSlice).map((a) => (
            <TopArtistWrap>
              <ArtistImage key={a.id} image={a.images[0].url} topArtist>
                <ArtistNameHover>
                  <ArtistName>{a.name}</ArtistName>
                </ArtistNameHover>
              </ArtistImage>
            </TopArtistWrap>
          ))}
      </Flex>
      <SlideToggleContent isVisible={showAll}>
        <Flex>
          {computedArtists &&
            computedArtists.slice(computedSlice).map((a) => (
              <ArtistWrap>
                <ArtistImage key={a.id} image={a.images[0].url}>
                  <ArtistNameHover>
                    <ArtistName>{a.name}</ArtistName>
                  </ArtistNameHover>
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
