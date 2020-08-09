import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectAristRange, selectTopArtists } from '../store/reducer';
import { CHANGE_ARTIST_DATE_RANGE } from '../store/types';

import SlideToggleContent from './SlideToggleContent';
import Button from './Button';
import RangeSelector from './RangeSelector';
import TopImage from './TopImage';

import { useWindowSize } from '../utils/hooks';
import { getViewportName } from '../utils/helpers';

const Section = styled.section`
  margin: 60px 0px;
`;

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
  ${({ mb }) => mb && `margin-bottom: ${mb}px`}
  ${({ mt }) => mt && `margin-top: ${mt}px`}
`;

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
  const computedSlice = sliceRange[getViewportName(viewportWidth)];

  return (
    <Section>
      <Flex alignCenter mb={20}>
        <Heading>Top Artists</Heading>
        <RangeSelector type={CHANGE_ARTIST_DATE_RANGE} value={range} />
      </Flex>
      <Flex>
        {computedArtists &&
          computedArtists
            .slice(0, computedSlice)
            .map((a) => (
              <TopImage
                key={a.id}
                featured
                image={a.images[0].url}
                label={a.name}
              />
            ))}
      </Flex>
      <SlideToggleContent isVisible={showAll}>
        <Flex>
          {computedArtists &&
            computedArtists
              .slice(computedSlice)
              .map((a) => (
                <TopImage key={a.id} image={a.images[0].url} label={a.name} />
              ))}
        </Flex>
      </SlideToggleContent>
      <Flex justifyCenter alignCenter mt={20}>
        <Button onClick={handleShowAll}>
          {showAll ? 'Show less' : 'Show more'}
        </Button>
      </Flex>
    </Section>
  );
};

export default TopArtists;
