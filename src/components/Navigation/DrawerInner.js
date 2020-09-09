import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import {
  MdDashboard,
  MdAlbum,
  MdPlaylistPlay,
  MdLibraryMusic,
  MdTagFaces,
} from 'react-icons/md';

import { selectProfile } from '../../store/reducer';

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

const UserImage = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  background-image: url(${({ image }) => image});
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

const DrawerInner = () => {
  // Hooks
  const themeContext = useContext(ThemeContext);
  const { pathname } = useLocation();

  // Redux
  const profile = useSelector((state) => selectProfile(state));

  return (
    <>
      <Profile>
        <Heading>
          Unwrapped
          <span style={{ color: themeContext.main }}>.</span>
        </Heading>
        {profile && profile.images && profile.images.length > 0 && (
          <ImageWrap>
            <UserImage image={profile.images[0].url} />
          </ImageWrap>
        )}
        {profile && profile.display_name && (
          <h3 style={{ marginBottom: 0, textAlign: 'center' }}>
            {profile.display_name}
          </h3>
        )}
      </Profile>
      <NavList>
        {menuRoutes.map(({ key, label, icon: Icon, to }) => {
          const isActive = pathname.includes(to);
          return (
            <NavItem key={key}>
              <NavLink to={to} active={isActive ? 1 : 0}>
                <Icon />
                {label}
              </NavLink>
            </NavItem>
          );
        })}
      </NavList>
    </>
  );
};

export default DrawerInner;
