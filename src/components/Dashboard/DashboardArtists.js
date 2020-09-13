import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectAristRange, selectTopArtists } from '../../store/reducer';
import { CHANGE_ARTIST_DATE_RANGE } from '../../store/types';

import DashboardSectionWrap from './DashboardSectionWrap';
import Flex from '../Flex';
import FeatureImage from '../FeatureImage';

import { useWindowSize } from '../../utils/hooks';
import { getViewportName } from '../../utils/helpers';

const DashboardArtists = () => {
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

  return (
    <DashboardSectionWrap
      id="top-artists"
      heading="Top Artists"
      showRange
      actionType={CHANGE_ARTIST_DATE_RANGE}
      selectedRange={range}
      seeMoreLink="/top-artists"
    >
      <Flex flexWrap="wrap">
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
    </DashboardSectionWrap>
  );
};

export default DashboardArtists;
