import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { clearTokens } from '../utils/tokenHelpers';

import { getUserProfile } from '../store/actions';
import { selectProfile } from '../store/reducer';

import { useWindowSize } from '../utils/hooks';

import mixins from '../styles/mixins';

const MobileDrawer = styled(animated.div)`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  height: 100%;
  width: 220px;
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 48px;
  background-color: #ffffff;
  @media (min-width: 992px) {
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
  padding: 16px;
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
  align-items: center;
`;

const MobileNavBar = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
  padding: 20px 16px;
  color: white;
  background-color: red;
  position: fixed;
  width: calc(100% - 32px);
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Email = styled.h5`
  ${mixins.overflowEllipsis}
  font-size: 12px;
`;

const DesktopDrawerWrap = styled.div`
  display: none;
  width: 220px;
  @media (min-width: 992px) {
    display: block;
  }
`;

const DesktopDrawer = styled.div`
  display: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  @media (min-width: 992px) {
    background-color: #ffffff;
    position: fixed;
    height: 100vh;
    width: 220px;
    display: flex;
    flex-direction: column;
  }
`;

const Navigation = () => {
  // Hooks
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  // Viewport
  const { width: windowWidth } = useWindowSize();
  const isDesktop = windowWidth >= 768;

  // Local state
  const [isOpen, setIsOpen] = useState(false);

  // Get user profile on mount
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  // Redux
  const profile = useSelector((state) => selectProfile(state));

  // Lock body from scrolling when mobile menu open
  useEffect(() => {
    if (!isDesktop && isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [isDesktop, isOpen]);

  // Slide animation
  const animatedProps = useSpring({ left: isOpen ? 0 : -300 });

  // Event handlers
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const drawerLinks = (
    <>
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
          <h3 style={{ marginBottom: 0, textAlign: 'center' }}>
            Hello, {profile.display_name}!
          </h3>
        )}
        {profile && profile.email && <Email>{profile.email}</Email>}
      </Profile>
      <NavList>
        <NavItem>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/top-artists">Top Artists</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/top-albums">Top Albums</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/top-tracks">Top Tracks</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/playlists">Playlists</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/recommendations">Recommendations</NavLink>
        </NavItem>
      </NavList>
      <Logout onClick={clearTokens} role="presentation">
        Logout
      </Logout>
    </>
  );

  return (
    <>
      <MobileNavBar>
        <button onClick={toggleMenu} type="button">
          Toggle
        </button>
      </MobileNavBar>
      <MobileDrawer id="mobile-drawer" style={animatedProps}>
        {drawerLinks}
      </MobileDrawer>
      <DesktopDrawerWrap>
        <DesktopDrawer id="desktop-drawer">{drawerLinks}</DesktopDrawer>
      </DesktopDrawerWrap>
    </>
  );
};

export default Navigation;
