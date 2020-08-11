import React from 'react';
import { useSelector } from 'react-redux';

import { selectAristRange, selectTopArtists } from '../store/reducer';
import { CHANGE_ARTIST_DATE_RANGE } from '../store/types';

import DashboardSectionWrap from './DashboardSectionWrap';
import Flex from './Flex';
import TopImage from './TopImage';

import { useWindowSize } from '../utils/hooks';
import { getViewportName } from '../utils/helpers';

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

  return (
    <DashboardSectionWrap
      id="top-artists"
      heading="Top Artists"
      showRange
      actionType={CHANGE_ARTIST_DATE_RANGE}
      selectedRange={range}
      seeMoreLink="/top-artists"
    >
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
    </DashboardSectionWrap>
  );
};

export default TopArtists;
