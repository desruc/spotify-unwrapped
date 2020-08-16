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

import * as actions from '../store/actions';

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const MainView = styled.div`
  flex: 1;
`;

const AuthenticatedView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllTimeArtists());
    dispatch(actions.getHalfYearArtists());
    dispatch(actions.getMonthArtists());
    dispatch(actions.getAllTimeTracks());
    dispatch(actions.getHalfYearTracks());
    dispatch(actions.getMonthTracks());
    dispatch(actions.getRecentlyPlayed());
  }, []);

  return (
    <Wrap id="page-wrap">
      <Flex>
        <Navigation />
        <MainView>
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
        </MainView>
      </Flex>
    </Wrap>
  );
};

export default AuthenticatedView;
