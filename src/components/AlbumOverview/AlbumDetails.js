import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flex from '../Flex';

const AlbumImage = styled.div`
  width: 300px;
  height: 300px;
  margin-right: 24px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  background-size: cover;
  background-position: center center;
  background-image: url(${({ image }) => image});
`;

const Heading = styled.h2`
  line-height: 1;
  font-size: 42px;
  margin-bottom: 5px;
  margin-top: 0;
`;

const Button = styled.a`
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  display: block;
  background-color: ${({ theme }) => theme.main};
  color: #ffffff;
  font-weight: 700;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  width: fit-content;
`;

const AlbumDetails = ({ name, image, spotifyLink }) => {
  return (
    <Flex mb={40}>
      <AlbumImage image={image} />
      <div>
        <Heading>{name}</Heading>
        <Button href={spotifyLink} target="_blank" rel="noopener noreferrer">
          Open in Spotify
        </Button>
      </div>
    </Flex>
  );
};

AlbumDetails.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  spotifyLink: PropTypes.string.isRequired,
};

export default AlbumDetails;
