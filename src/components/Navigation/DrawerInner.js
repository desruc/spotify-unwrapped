import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import {
  MdDashboard,
  MdAlbum,
  MdPlaylistPlay,
  MdLibraryMusic,
  MdTagFaces,
  MdEject,
} from 'react-icons/md';

import Flex from '../Common/Flex';
import ProfileLoading from './ProfileLoading';

import { selectProfile } from '../../store/reducer';
import { clearTokens } from '../../utils/tokenHelpers';

const Heading = styled.h2`
  margin-bottom: 60px;
`;

const Profile = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrap = styled.div`
  height: 100px;
  width: 100px;
  border: 3px solid;
  border-color: ${(props) => props.theme.main};
  border-radius: 50%;
  padding: 3px;
`;

const UserImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;

const Username = styled.h3`
  margin-top: 16px;
  text-align: center;
`;

const FollowersHeading = styled.h5`
  font-weight: 300;
  margin-bottom: 0px;
`;

const Followers = styled.h6`
  font-weight: 300;
  color: ${({ theme }) => theme.tertiary};
  margin-bottom: 0px;
`;

const NavList = styled.ul`
  margin: 20px 0px;
  padding: 0px;
  flex: 1;
  li {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

const NavItem = styled.li`
  width: 100%;
  list-style: none;
`;

const NavLink = styled(Link)`
  width: 100%;
  padding: 8px 24px;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  text-decoration: none !important;
  color: ${({ active, theme }) => (active ? theme.main : theme.text)};
  &:hover {
    color: ${({ theme }) => theme.main};
  }
  svg {
    height: 24px;
    width: 24px;
    margin-right: 10px;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 8px 24px;
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: ${({ active, theme }) => (active ? theme.main : theme.text)};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 16px;
  &:hover {
    color: ${({ theme }) => theme.main};
  }
  svg {
    height: 24px;
    width: 24px;
    margin-right: 10px;
  }
`;

const menuRoutes = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: MdDashboard,
    to: '/dashboard',
  },
  {
    key: 'topArtists',
    label: 'Top Artists',
    icon: MdTagFaces,
    to: '/top-artists',
  },
  {
    key: 'topAlbums',
    label: 'Top Albums',
    icon: MdAlbum,
    to: '/top-albums',
  },
  {
    key: 'topTracks',
    label: 'Top Tracks',
    icon: MdLibraryMusic,
    to: '/top-tracks',
  },
  {
    key: 'playlists',
    label: 'Playlists',
    icon: MdPlaylistPlay,
    to: '/playlists',
  },
];

const DrawerInner = ({ closeDrawer }) => {
  // Hooks
  const themeContext = useContext(ThemeContext);
  const { pathname } = useLocation();

  // Redux
  const profile = useSelector((state) => selectProfile(state));

  // Event handlers
  const onLinkClick = () => {
    closeDrawer();
  };

  return (
    <>
      <Profile>
        <Heading>
          Unwrapped
          <span style={{ color: themeContext.main }}>.</span>
        </Heading>
        {!profile && <ProfileLoading />}
        {profile && profile.images && profile.images.length > 0 && (
          <ImageWrap>
            <UserImage src={profile.images[0].url} />
          </ImageWrap>
        )}
        {profile && profile.display_name && (
          <Username>{profile.display_name}</Username>
        )}
        {profile && profile.followers?.total && (
          <Flex alignItems="center" flexDirection="column">
            <FollowersHeading>Followers</FollowersHeading>
            <Followers>{profile.followers.total}</Followers>
          </Flex>
        )}
      </Profile>
      <NavList>
        {menuRoutes.map(({ key, label, icon: Icon, to }) => {
          const isActive = pathname.includes(to);
          return (
            <NavItem key={key}>
              <NavLink to={to} active={isActive ? 1 : 0} onClick={onLinkClick}>
                <Icon />
                {label}
              </NavLink>
            </NavItem>
          );
        })}
      </NavList>
      <LogoutButton onClick={clearTokens}>
        <MdEject />
        Logout
      </LogoutButton>
    </>
  );
};

DrawerInner.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};

export default DrawerInner;
