import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Navigation from './Navigation';

import Dashboard from './Dashboard';

import * as actions from '../store/actions';

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
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
    <Wrap>
      <Navigation />
      <MainView>
        <Switch>
          <Route path={['/', '/dashboard']} component={Dashboard} />
        </Switch>
      </MainView>
    </Wrap>
  );
};

export default AuthenticatedView;
