import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectTopTracks, selectAlbumRange } from '../store/reducer';
import { CHANGE_ALBUM_DATE_RANGE } from '../store/types';

import PageHeader from '../components/PageHeader';
import RangeTabs from '../components/RangeTabs';
import Flex from '../components/Flex';
import FeatureImage from '../components/FeatureImage';

import { useWindowSize } from '../utils/hooks';
import {
  getViewportName,
  getTopAlbums,
  getArtist,
  truncateString,
} from '../utils/helpers';

const TopAlbums = () => {
  // Hooks
  const { width: viewportWidth } = useWindowSize();
  const history = useHistory();

  // Redux
  const range = useSelector((state) => selectAlbumRange(state));
  const tracks = useSelector((state) => selectTopTracks(state));

  // Event handlers
  const onAlbumClick = (album) => {
    const { id } = album;
    history.push(`/album/${id}`);
  };

  // Constants
  const sliceRange = {
    mobile: 4,
    tablet: 6,
    desktop: 8,
  };
  const computedAlbums = getTopAlbums(tracks[range]);
  const viewportName = getViewportName(viewportWidth);
  const computedSlice = sliceRange[viewportName];

  const isDesktop = viewportName === 'desktop';

  const headerActions = (
    <RangeTabs actionType={CHANGE_ALBUM_DATE_RANGE} selected={range} />
  );

  return (
    <main>
      <PageHeader heading="Top Albums" actions={headerActions} />
      <Flex wrap>
        {computedAlbums &&
          computedAlbums.slice(0, computedSlice).map((a) => {
            const artist = getArtist(a[0]);
            const albumTitle = a[0].name;
            return (
              <FeatureImage
                key={a[0].id}
                featured
                image={a[0].images[0].url}
                artist={artist}
                album={isDesktop ? truncateString(albumTitle, 45) : albumTitle}
                onClick={() => onAlbumClick(a[0])}
              />
            );
          })}
      </Flex>
      <Flex wrap>
        {computedAlbums &&
          computedAlbums.slice(computedSlice).map((a) => {
            const artist = getArtist(a[0]);
            const albumTitle = a[0].name;
            return (
              <FeatureImage
                key={a[0].id}
                image={a[0].images[0].url}
                artist={artist}
                album={isDesktop ? truncateString(albumTitle, 45) : albumTitle}
                onClick={() => onAlbumClick(a[0])}
              />
            );
          })}
      </Flex>
    </main>
  );
};

export default TopAlbums;
