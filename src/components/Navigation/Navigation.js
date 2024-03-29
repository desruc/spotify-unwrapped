import React, { useState, useEffect, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';

import Headroom from 'react-headroom';
import SlideBurger from '@animated-burgers/burger-slide';
import '@animated-burgers/burger-slide/dist/styles.css';

import { useDispatch } from 'react-redux';

import { getUserProfile } from '../../store/actions';

import { useWindowSize, useOnClickOutside } from '../../utils/hooks';

import DrawerInner from './DrawerInner';

const MobileDrawer = styled(animated.div)`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  height: 100%;
  width: 220px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardBackground};
  overflow: auto;
  @media (min-width: 1200px) {
    display: none;
  }
`;

const MobileNavBar = styled(Headroom)`
  z-index: 10;
  .headroom {
    padding: 0px 16px;
    min-height: 70px;
    display: flex;
    align-items: center;
  }
  .headroom--unfixed {
    transition: background-color 0.2s ease-in-out;
    background: ${({ isOpen, theme }) =>
    isOpen ? 'transparent' : theme.background};
  }
  .headroom--pinned {
    background: ${({ isOpen, theme }) =>
    isOpen ? 'transparent' : theme.cardBackground};
  }
  position: absolute;
  width: 100%;
  @media (min-width: 1200px) {
    display: none;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in-out;
  opacity: ${({ open }) => (open ? 1 : 0)};
  z-index: ${({ open }) => (open ? 10 : -5)};
`;

const MobileHeading = styled(Link)`
  font-size: 1.5em;
  color: ${({ theme }) => theme.heading};
  text-decoration: none;
  flex: 1;
`;

const DesktopDrawerWrap = styled.div`
  display: none;
  width: 220px;
  z-index: 12;
  @media (min-width: 1200px) {
    display: block;
  }
`;

const DesktopDrawer = styled.div`
  display: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: ${(props) => props.theme.cardBackground};
  z-index: 12;
  @media (min-width: 1200px) {
    position: fixed;
    height: 100vh;
    width: 220px;
    display: flex;
    flex-direction: column;
  }
`;

const Navigation = () => {
  // Hooks
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  // Viewport
  const { width: windowWidth } = useWindowSize();
  const isDesktop = windowWidth >= 1200;

  // Local state
  const [isOpen, setIsOpen] = useState(false);

  // Get user profile on mount
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  // Lock body from scrolling when mobile menu open
  useEffect(() => {
    if (!isDesktop && isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [isDesktop, isOpen]);

  // Slide animation
  const animatedProps = useSpring({ left: isOpen ? 0 : -300 });

  // Event handlers
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleOutsideClick = (e) => {
    const {
      target: { id },
    } = e;

    // Dont fire if hitting menu item
    if (id === 'menu-burger') return;

    closeDrawer();
  };

  // Ref for detecting outside click
  const drawerRef = useRef();
  useOnClickOutside(drawerRef, handleOutsideClick);

  return (
    <>
      <Backdrop open={isOpen} />
      <MobileNavBar>
        <MobileHeading to="/">
          Unwrapped
          <span style={{ color: themeContext.main }}>.</span>
        </MobileHeading>
        <SlideBurger id="menu-burger" onClick={toggleDrawer} isOpen={isOpen}>
          Toggle
        </SlideBurger>
      </MobileNavBar>
      <MobileDrawer id="mobile-drawer" style={animatedProps} ref={drawerRef}>
        <DrawerInner closeDrawer={closeDrawer} />
      </MobileDrawer>
      <DesktopDrawerWrap>
        <DesktopDrawer id="desktop-drawer">
          <DrawerInner closeDrawer={closeDrawer} />
        </DesktopDrawer>
      </DesktopDrawerWrap>
    </>
  );
};

export default Navigation;
