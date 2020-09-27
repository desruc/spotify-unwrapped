import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import Flex from '../components/Common/Flex';
import ButtonLink from '../components/Common/ButtonLink';
import Footer from '../components/Common/Footer';

import dashboard from '../static/dashboard.jpg';
import trackdetails from '../static/trackdetails.jpg';
import discover from '../static/discover.jpg';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 100px auto;
  max-width: 1200px;
  padding: 0px 16px;
  width: 100%;
  @media (min-width: 1200px) {
    padding: 0px 32px;
  }
`;

const SubHeading = styled.h2`
  fontweight: 400;
  text-align: center;
`;

const StyledFlex = styled(Flex)`
  flex-direction: column-reverse;
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  display: inline-block;
  width: 100%;
  @media (min-width: 992px) {
    padding: 16px;
    width: 50%;
  }
`;

const Image = styled.img`
  margin-bottom: 16px;
  border-radius: 6px;
  height: auto;
  max-width: 100%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 25px;
  @media (min-width: 992px) {
    margin-bottom: 0px;
  }
`;

const loginUri =
  process.env.NODE_ENV === 'production'
    ? 'https://unwrapped.jmscmrn.com/login'
    : 'http://localhost:3000/login';

const LoginSplash = () => {
  // Hooks
  const themeContext = useContext(ThemeContext);

  return (
    <Wrap>
      <h1>
        Unwrapped<span style={{ color: themeContext.main }}>.</span>
      </h1>
      <SubHeading>
        A web application that allows you visualize your personal Spotify data
      </SubHeading>
      <span style={{ marginBottom: 16, textAlign: 'center' }}>
        Log in with your Spotify account to get started
      </span>
      <ButtonLink href={loginUri}>Login</ButtonLink>
      <Flex flexWrap="wrap" mt="50px">
        <Column>
          <Image src={dashboard} alt="Unwrapped Dashboard" />
        </Column>
        <Column>
          <h2>Top of the Pops</h2>
          <p>
            Ever wondered what song you&apos;ve listened to the most of Spotify? Now
            you can find out! Unwrapped gives you a breakdown of your top
            artists, albums, tracks, and genres in three different date ranges -
            all time, the past six months, or the past month.
          </p>
        </Column>
      </Flex>
      <StyledFlex flexWrap="wrap" mt="50px">
        <Column>
          <h2>How danceable is this song?</h2>
          <p>
            Get a look into the inner workings of a track. Unrapped utilizes
            Spotifys API to provide the user with an advanced audio analysis -
            including but not limited to it&apos;s{' '}
            <span style={{ fontStyle: 'italic' }}>Danceability</span> and{' '}
            <span style={{ fontStyle: 'italic' }}>Liveness</span>.
          </p>
        </Column>
        <Column>
          <Image src={trackdetails} alt="Unwrapped Track Details" />
        </Column>
      </StyledFlex>
      <Flex flexWrap="wrap" mt="50px">
        <Column>
          <Image src={discover} alt="Unwrapped Discover" />
        </Column>
        <Column>
          <h2>It&apos;s time for something new</h2>
          <p>
            Unwrapped provides a randomly generated list of recommendations each
            time you vist the Discover page. These recommendations are based off
            your recent listening activity.
          </p>
        </Column>
      </Flex>
      <Footer />
    </Wrap>
  );
};

export default LoginSplash;
