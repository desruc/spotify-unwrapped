import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ButtonLink from './ButtonLink';

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    flex-wrap: no-wrap;
    justify-content: flex-start;
  }
`;

const Inner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  @media (min-width: 768px) {
    text-align: start;
    margin-top: 0px;
    justify-content: flex-start;
    align-items: start;
  }
`;

const Image = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  background-size: cover;
  background-position: center center;
  background-image: url(${({ image }) => image});
  @media (min-width: 768px) {
    margin-right: 24px;
  }
`;

const Heading = styled.h2`
  line-height: 1;
  font-size: 42px;
  margin-bottom: 5px;
  margin-top: 0;
`;

const OverviewDetails = ({ imageSrc, heading, spotifyUrl, children }) => (
  <Wrap>
    <Image image={imageSrc} />
    <Inner>
      <Heading>{heading}</Heading>
      {children}
      {spotifyUrl && (
        <ButtonLink href={spotifyUrl} target="_blank" rel="noopener noreferrer">
          Open in Spotify
        </ButtonLink>
      )}
    </Inner>
  </Wrap>
);

OverviewDetails.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  spotifyUrl: PropTypes.string,
  children: PropTypes.node,
};

OverviewDetails.defaultProps = {
  spotifyUrl: '',
  children: null,
};

export default OverviewDetails;
