import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import PageWrap from './PageWrap';
import Menu from './Menu';

import Dashboard from './Dashboard';

import * as actions from '../store/actions';

const MainView = styled.div`
  width: 100%;
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
    <PageWrap>
      <Menu />
      <MainView>
        <Switch>
          <Route path={['/', '/dashboard']} component={Dashboard} />
        </Switch>
      </MainView>
    </PageWrap>
  );
};

export default AuthenticatedView;
