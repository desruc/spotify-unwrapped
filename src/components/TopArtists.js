import React from 'react';
import { useSelector } from 'react-redux';

import { selectTopArtists, selectAristRange } from '../store/reducer';

import Container from './Container';
import PageHeader from './PageHeader';
import RangeTabs from './RangeTabs';
import Flex from './Flex';
import FeatureImage from './FeatureImage';

import { useWindowSize } from '../utils/hooks';
import { getViewportName } from '../utils/helpers';
import { CHANGE_ARTIST_DATE_RANGE } from '../store/types';

const TopArtists = () => {
  // Hooks
  const { width: viewportWidth } = useWindowSize();

  // Redux
  const range = useSelector((state) => selectAristRange(state));
  const artists = useSelector((state) => selectTopArtists(state));

  // Constants
  const sliceRange = {
    mobile: 4,
    tablet: 6,
    desktop: 8,
  };
  const computedArtists = artists[range];
  const computedSlice = sliceRange[getViewportName(viewportWidth)];

  const headerActions = (
    <RangeTabs actionType={CHANGE_ARTIST_DATE_RANGE} selected={range} />
  );

  return (
    <main>
      <Container>
        <PageHeader heading="Top Artists" actions={headerActions} />
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
