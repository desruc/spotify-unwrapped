import React from 'react';
import styled from 'styled-components';
import PageHeader from '../Common/PageHeader';

import Flex from '../Common/Flex';
import Card from '../Common/Card';
import LoadingBox from '../Common/LoadingBox';
import List from '../Common/List';
import TrackLoading from '../Common/TrackLoading';

import { useWindowSize } from '../../utils/hooks';
import { getViewportName } from '../../utils/helpers';

const Section = styled.section`
  margin: 20px 0px;
  @media (min-width: 768px) {
    margin: 40px 0px;
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  @media (min-width: 768px) {
    flex: 1;
  }
`;

const RecentlyPlayedWrap = styled.div`
  width: 100%;
  @media (min-width: 1200px) {
    padding-right: 16px;
    width: 25%;
  }
`;

const TopTracksWrap = styled.div`
  width: 100%;
  margin-top: 40px;
  @media (min-width: 1200px) {
    margin-top: 0px;
    width: 75%;
  }
`;

const TopArtistAlbumWrap = styled.div`
  flex-basis: 50%;
  @media (min-width: 768px) {
    flex-basis: 33.33333333333333%;
  }
  @media (min-width: 992px) {
    flex-basis: 25%;
  }
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 170px;
  @media (min-width: 768px) {
    height: 200px;
  }
  @media (min-width: 992px) {
    height: 330px;
  }
`;

const DashboardLoading = () => {
  // Hooks
  const { width: viewportWidth } = useWindowSize();

  // Constants
  const sliceRange = {
    mobile: 4,
    tablet: 6,
    desktop: 8,
  };

  return (
    <main>
      <PageHeader heading="Dashboard" />
      <Section>
        <Flex flexWrap="wrap">
          <RecentlyPlayedWrap>
            <Section>
              <Heading>Recently Played</Heading>
              <Card>
                <List>
                  {[...new Array(5)].map((e, idx) => (
                    <TrackLoading key={`recent-loading-${idx}`} />
                  ))}
                </List>
              </Card>
            </Section>
          </RecentlyPlayedWrap>
          <TopTracksWrap>
            <Section>
              <Heading>Top Tracks</Heading>
              <Card>
                <List twoColumns>
                  {[...new Array(10)].map((e, idx) => (
                    <TrackLoading key={`recent-loading-${idx}`} />
                  ))}
                </List>
              </Card>
            </Section>
          </TopTracksWrap>
        </Flex>
      </Section>
      <Section>
        <Heading>Top Artists</Heading>
        <Card padding="5px">
          <Flex flexWrap="wrap">
            {[...new Array(sliceRange[getViewportName(viewportWidth)])].map(
              (e, idx) => (
                <TopArtistAlbumWrap key={`artist-loading-${idx}`}>
                  <ImageWrap>
                    <LoadingBox
                      height="calc(100% - 10px)"
                      width="calc(100% - 10px)"
                    />
                  </ImageWrap>
                </TopArtistAlbumWrap>
              )
            )}
          </Flex>
        </Card>
      </Section>
      <Section>
        <Heading>Top Albums</Heading>
        <Card padding="5px">
          <Flex flexWrap="wrap">
            {[...new Array(sliceRange[getViewportName(viewportWidth)])].map(
              (e, idx) => (
                <TopArtistAlbumWrap key={`album-loading-${idx}`}>
                  <ImageWrap>
                    <LoadingBox
                      height="calc(100% - 10px)"
                      width="calc(100% - 10px)"
                    />
                  </ImageWrap>
                </TopArtistAlbumWrap>
              )
            )}
          </Flex>
        </Card>
      </Section>
      <Section>
        <Heading>Top Genres</Heading>
        <Card padding="16px" height="400px">
          <LoadingBox height="100%" width="100%" borderRadius="6px" />
        </Card>
      </Section>
    </main>
  );
};

export default DashboardLoading;
