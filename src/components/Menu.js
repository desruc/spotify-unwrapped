import React, { useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { clearTokens } from '../utils/tokenHelpers';

import { getUserProfile } from '../store/actions';
import { selectProfile } from '../store/reducer';

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 48px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ImageWrap = styled.div`
  height: 100px;
  width: 100px;
  border: 3px solid;
  border-color: ${(props) => props.theme.main};
  border-radius: 50%;
  padding: 3px;
`;

const UserImage = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  background-image: url(${({ image }) => image});
`;

const NavLink = styled(Link)`
  width: calc(100% - 32px);
  padding: 8px 16px;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  font-weight: 600;
  display: block;
  text-decoration: none !important;
  &:hover {
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const NavList = styled.ul`
  margin: 20px 0px;
  padding: 0;
  flex: 1;
  li {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const NavItem = styled.li`
  width: 100%;
  list-style: none;
`;

const Logout = styled.div`
  width: calc(100% - 32px);
  padding: 8px 16px;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  font-weight: 600;
  display: block;
  text-decoration: none !important;
  &:hover {
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const Profile = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Menu = () => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const profile = useSelector((state) => selectProfile(state));

  return (
    <Container>
      <Profile>
        <h2>
          Unwrapped
          <span style={{ color: themeContext.main }}>.</span>
        </h2>
        {profile && profile.images && profile.images.length > 0 && (
          <ImageWrap>
            <UserImage image={profile.images[0].url} />
          </ImageWrap>
        )}
        {profile && profile.display_name && (
          <h3 style={{ marginBottom: 0 }}>Hello, {profile.display_name}!</h3>
        )}
        {profile && profile.email && <small>{profile.email}</small>}
      </Profile>
      <NavList>
        <NavItem>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </NavItem>
      </NavList>
      <Logout onClick={clearTokens} role="presentation">
        Logout
      </Logout>
    </Container>
  );
};

export default Menu;
