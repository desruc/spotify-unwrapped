import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectTopTracks, selectAlbumRange } from '../store/reducer';
import { CHANGE_ALBUM_DATE_RANGE } from '../store/types';

import SlideToggleContent from './SlideToggleContent';
import Button from './Button';
import RangeSelector from './RangeSelector';
import TopImage from './TopImage';

import { useWindowSize } from '../utils/hooks';

import { getTopAlbums, getViewportName, getArtist } from '../utils/helpers';

const Heading = styled.h1`
  font-size: 2rem;
  margin: 0px;
  flex: 1;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justifyCenter }) =>
    justifyCenter ? 'center' : 'flex-start'};
  align-items: ${({ alignCenter }) => (alignCenter ? 'center' : 'flex-start')};
`;

const TopAlbums = () => {
  // Hooks
  const { width: viewportWidth } = useWindowSize();

  // Local
  const [showAll, setShowAll] = useState(false);

  // Redux
  const range = useSelector((state) => selectAlbumRange(state));
  const tracks = useSelector((state) => selectTopTracks(state));

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
  const computedAlbums = getTopAlbums(tracks[range]);
  const computedSlice = sliceRange[getViewportName(viewportWidth)];

  return (
    <section>
      <Flex alignCenter style={{ marginBottom: 20 }} id="topArtistsContainer">
        <Heading>Top Albums</Heading>
        <RangeSelector type={CHANGE_ALBUM_DATE_RANGE} value={range} />
      </Flex>
      <Flex>
        {computedAlbums &&
          computedAlbums.slice(0, computedSlice).map((a) => {
            const artist = getArtist(a[0]);
            const albumTitle = a[0].name;
            return (
              <TopImage
                key={a[0].id}
                featured
                image={a[0].images[0].url}
                label={`${artist} - ${albumTitle}`}
              />
            );
          })}
      </Flex>
      <SlideToggleContent isVisible={showAll}>
        <Flex>
          {computedAlbums &&
            computedAlbums.slice(computedSlice).map((a) => {
              const artist = getArtist(a[0]);
              const albumTitle = a[0].name;
              return (
                <TopImage
                  key={a[0].id}
                  image={a[0].images[0].url}
                  label={`${artist} - ${albumTitle}`}
                />
              );
            })}
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

export default TopAlbums;
