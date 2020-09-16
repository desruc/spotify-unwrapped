import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PageHeader from './PageHeader';
import Flex from './Flex';
import LoadingBox from './LoadingBox';

import { useWindowSize } from '../../utils/hooks';
import { getViewportName, randomId } from '../../utils/helpers';

const ImageWrap = styled.div`
  flex-basis: 50%;
  @media (min-width: 768px) {
    flex-basis: ${({ featured }) => (featured ? `33.33333333333333%;` : `25%`)};
  }
  @media (min-width: 992px) {
    flex-basis: ${({ featured }) => (featured ? `25%` : `14.28571428571429%`)};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 170px;
  @media (min-width: 768px) {
    ${({ featured }) => featured && `height: 330px;`}
  }
  @media (min-width: 992px) {
    ${({ featured }) => !featured && `height: 200px;`}
  }
`;

const TopArtistAlbumLoading = ({ heading }) => {
  // Hooks
  const { width: viewportWidth } = useWindowSize();

  // Constants
  const sliceRange = {
    mobile: 4,
    tablet: 6,
    desktop: 8,
  };

  const computedSlice = sliceRange[getViewportName(viewportWidth)];

  return (
    <main>
      <PageHeader heading={heading} />
      <Flex flexWrap="wrap">
        {[...new Array(computedSlice)].map(() => (
          <ImageWrap featured key={randomId()}>
            <ImageContainer featured>
              <LoadingBox
                height="calc(100% - 10px)"
                width="calc(100% - 10px)"
              />
            </ImageContainer>
          </ImageWrap>
        ))}
      </Flex>
      <Flex flexWrap="wrap">
        {[...new Array(50 - computedSlice)].map(() => (
          <ImageWrap key={randomId()}>
            <ImageContainer>
              <LoadingBox
                height="calc(100% - 10px)"
                width="calc(100% - 10px)"
              />
            </ImageContainer>
          </ImageWrap>
        ))}
      </Flex>
    </main>
  );
};

TopArtistAlbumLoading.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default TopArtistAlbumLoading;
