import React from 'react';
import styled from 'styled-components';

import LoadingBox from './LoadingBox';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const Inner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  @media (min-width: 768px) {
    text-align: start;
    margin-top: 0px;
    justify-content: flex-start;
    align-items: start;
  }
`;

const Image = styled(LoadingBox)`
  @media (min-width: 768px) {
    margin-right: 24px;
  }
`;

const OverviewDetailsLoading = () => (
  <Wrap>
    <Image height="290px" width="290px" borderRadius="6px" />
    <Inner>
      <LoadingBox
        fontSize="42px"
        mb="5px"
        height="fit-content"
        width="fit-content"
      >
        The heading is loading
      </LoadingBox>
      <LoadingBox mb="5px" height="fit-content" width="fit-content">
        Please hold while we load your data
      </LoadingBox>
      <LoadingBox mb="5px" height="fit-content" width="fit-content">
        Loading...
      </LoadingBox>
    </Inner>
  </Wrap>
);

export default OverviewDetailsLoading;
