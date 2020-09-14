import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import RecentlyPlayed from './RecentlyPlayed';
import TopArtists from './TopArtists';
import TopAlbums from './TopAlbums';
import TopTracks from './TopTracks';
import Dashboard from './Dashboard';
import TrackOverview from './TrackOverview';
import ArtistOverview from './ArtistOverview';
import AlbumOverview from './AlbumOverview';
import Playlists from './Playlists';
import PlaylistTracks from './PlaylistDetails';

import Flex from '../components/Common/Flex';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Common/Footer';
import ScrollToTop from '../components/Common/ScrollToTop';

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
  width: 100%;
  @media (min-width: 1200px) {
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
              <Route exact path="/track/:trackId" component={TrackOverview} />
              <Route
                exact
                path="/artist/:artistId"
                component={ArtistOverview}
              />
              <Route exact path="/album/:albumId" component={AlbumOverview} />
              <Route exact path="/playlists" component={Playlists} />
              <Route exact path="/playlist/:playlistId" component={PlaylistTracks} />
              <Route path={['/', '/dashboard']} component={Dashboard} />
            </Switch>
            <Footer />
          </Container>
        </ContentWrap>
      </Flex>
      <ScrollToTop />
    </PageWrap>
  );
};

export default AuthenticatedView;
