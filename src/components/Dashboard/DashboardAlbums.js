import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectTopTracks, selectAlbumRange } from '../../store/reducer';
import { CHANGE_ALBUM_DATE_RANGE } from '../../store/types';

import DashboardSectionWrap from './DashboardSectionWrap';
import Flex from '../Flex';
import FeatureImage from '../FeatureImage';

import { useWindowSize } from '../../utils/hooks';

import {
  getTopAlbums,
  getViewportName,
  getArtist,
  truncateString,
} from '../../utils/helpers';

const DashboardAlbums = () => {
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

  return (
    <DashboardSectionWrap
      id="top-albums"
      heading="Top Albums"
      showRange
      actionType={CHANGE_ALBUM_DATE_RANGE}
      selectedRange={range}
      seeMoreLink="/top-albums"
    >
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
    </DashboardSectionWrap>
  );
};

export default DashboardAlbums;
