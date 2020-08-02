import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { clearTokens } from '../utils/tokenHelpers';

import { getUserProfile } from '../store/actions';
import { selectProfile } from '../store/reducer';

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const UserImage = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  background-image: url(${({ image }) => image});
`;

const Menu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const profile = useSelector((state) => selectProfile(state));

  return (
    <Container>
      <h5>Unwrapped.</h5>
      {profile && profile.images && profile.images.length > 0 && (
        <UserImage image={profile.images[0].url} />
      )}
      {profile && profile.display_name && <h5>Hello {profile.display_name}</h5>}
      {profile && profile.email && <span>{profile.email}</span>}
      <span onClick={clearTokens} role="presentation">
        Logout
      </span>
    </Container>
  );
};

export default Menu;
