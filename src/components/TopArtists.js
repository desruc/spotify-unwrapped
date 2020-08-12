import React from 'react';
import { useSelector } from 'react-redux';

import { selectTopArtists, selectTrackRange } from '../store/reducer';

import Container from './Container';
import PageHeader from './PageHeader';
import Flex from './Flex';
import FeatureImage from './FeatureImage';

import { useWindowSize } from '../utils/hooks';
import { getViewportName } from '../utils/helpers';

const TopArtists = () => {
  // Hooks
  const { width: viewportWidth } = useWindowSize();

  // Redux
  const range = useSelector((state) => selectTrackRange(state));
  const artists = useSelector((state) => selectTopArtists(state));

  // Constants
  const sliceRange = {
    mobile: 4,
    tablet: 6,
    desktop: 8,
  };
  const computedArtists = artists[range];
  const computedSlice = sliceRange[getViewportName(viewportWidth)];

  return (
    <main>
      <Container>
        <PageHeader>Top Artists</PageHeader>
        <Flex>
          {computedArtists &&
            computedArtists
              .slice(0, computedSlice)
              .map((a) => (
                <FeatureImage
                  key={a.id}
                  featured
                  image={a.images[0].url}
                  label={a.name}
                />
              ))}
        </Flex>
        <Flex>
          {computedArtists &&
            computedArtists
              .slice(computedSlice)
              .map((a) => (
                <FeatureImage
                  key={a.id}
                  image={a.images[0].url}
                  label={a.name}
                />
              ))}
        </Flex>
      </Container>
    </main>
  );
};

export default TopArtists;
