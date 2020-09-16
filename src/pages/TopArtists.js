import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  selectTopArtists,
  selectAristRange,
  selectTopArtistsLoading,
} from '../store/reducer';

import TopArtistAlbumLoading from '../components/Common/TopArtistAlbumLoading';
import PageHeader from '../components/Common/PageHeader';
import RangeTabs from '../components/Common/RangeTabs';
import Flex from '../components/Common/Flex';
import FeatureImage from '../components/Common/FeatureImage';

import { useWindowSize } from '../utils/hooks';
import { getViewportName } from '../utils/helpers';
import { CHANGE_ARTIST_DATE_RANGE } from '../store/types';

const TopArtists = () => {
  // Hooks
  const { width: viewportWidth } = useWindowSize();
  const history = useHistory();

  // Redux
  const loading = useSelector((state) => selectTopArtistsLoading(state));
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

  if (loading) return <TopArtistAlbumLoading heading="Top Artists" />;

  return (
    <main>
      <PageHeader heading="Top Artists" actions={headerActions} />
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
      <Flex flexWrap="wrap">
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
    </main>
  );
};

export default TopArtists;
