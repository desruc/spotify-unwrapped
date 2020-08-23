import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectTopArtists, selectAristRange } from '../store/reducer';

import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import RangeTabs from '../components/RangeTabs';
import Flex from '../components/Flex';
import FeatureImage from '../components/FeatureImage';

import { useWindowSize } from '../utils/hooks';
import { getViewportName } from '../utils/helpers';
import { CHANGE_ARTIST_DATE_RANGE } from '../store/types';

const TopArtists = () => {
  // Hooks
  const { width: viewportWidth } = useWindowSize();
  const history = useHistory();

  // Redux
  const range = useSelector((state) => selectAristRange(state));
  const artists = useSelector((state) => selectTopArtists(state));

  // Event handlers
  const onArtistClick = (artist) => {
    const { id } = artist;
    history.push(`/artist/${id}`);
  };

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
        <Flex wrap>
          {computedArtists &&
            computedArtists
              .slice(0, computedSlice)
              .map((a) => (
                <FeatureImage
                  key={a.id}
                  featured
                  image={a.images[0].url}
                  artist={a.name}
                  onClick={() => onArtistClick(a)}
                />
              ))}
        </Flex>
        <Flex wrap>
          {computedArtists &&
            computedArtists
              .slice(computedSlice)
              .map((a) => (
                <FeatureImage
                  key={a.id}
                  image={a.images[0].url}
                  artist={a.name}
                  onClick={() => onArtistClick(a)}
                />
              ))}
        </Flex>
      </Container>
    </main>
  );
};

export default TopArtists;