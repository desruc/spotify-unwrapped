import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Flex from '../components/Flex';
import Navigation from '../components/Navigation';

import RecentlyPlayed from './RecentlyPlayed';
import TopArtists from './TopArtists';
import TopAlbums from './TopAlbums';
import TopTracks from './TopTracks';
import Dashboard from './Dashboard';
import TrackDetails from './TrackDetails';
import ArtistDetails from './ArtistDetails';
import AlbumDetails from './AlbumDetails';

import { bootstrapArtists, bootstrapTracks } from '../store/actions';

const PageWrap = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const ContentWrap = styled.div`
  flex: 1;
`;

const Container = styled.div`
  margin: 80px auto;
  max-width: 1800px;
  padding: 0px 16px;
  width: calc(100% - 32px);
  @media (min-width: 992px) {
    margin: 40px auto 80px auto;
  }
`;

const AuthenticatedView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapArtists());
    dispatch(bootstrapTracks());
  }, []);

  return (
    <PageWrap id="page-wrap">
      <Flex>
        <Navigation />
        <ContentWrap>
          <Container>
            <Switch>
              <Route exact path="/recently-played" component={RecentlyPlayed} />
              <Route exact path="/top-artists" component={TopArtists} />
              <Route exact path="/top-albums" component={TopAlbums} />
              <Route exact path="/top-tracks" component={TopTracks} />
              <Route exact path="/track/:trackId" component={TrackDetails} />
              <Route exact path="/artist/:artistId" component={ArtistDetails} />
              <Route exact path="/album/:albumId" component={AlbumDetails} />
              <Route path={['/', '/dashboard']} component={Dashboard} />
            </Switch>
          </Container>
        </ContentWrap>
      </Flex>
    </PageWrap>
  );
};

export default AuthenticatedView;
