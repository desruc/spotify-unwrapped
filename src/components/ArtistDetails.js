import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flex from './Flex';

const ArtistImage = styled.div`
  width: 300px;
  height: 300px;
  margin-right: 24px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  background-size: cover;
  background-position: center center;
  background-image: url(${({ image }) => image});
`;

// const Image = styled.img`
//   height: auto;
//   width: 100%;
//   max-width: 100%;
//   vertical-align: middle;
//   border-radius: 6px;
// `;

const Heading = styled.h2`
  line-height: 1;
  font-size: 42px;
  margin-bottom: 5px;
  margin-top: 0;
`;

const Followers = styled.h4`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.secondary};
`;

const Popularity = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.tertiary};
`;

const Genres = styled.h5`
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

const ArtistDetails = ({
  name,
  image,
  popularity,
  genres,
  totalFollowers,
  spotifyLink,
}) => {
  return (
    <Flex mb={40}>
      <ArtistImage image={image} />
      <div>
        <Heading>{name}</Heading>
        <Popularity>Popularity: {popularity}</Popularity>
        <Followers>Followers: {totalFollowers}</Followers>
        <Genres>{genres && genres.map((g) => <span key={g}>{g}</span>)}</Genres>
        <Button href={spotifyLink} target="_blank" rel="noopener noreferrer">
          Open in Spotify
        </Button>
      </div>
    </Flex>
  );
};

ArtistDetails.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  totalFollowers: PropTypes.number.isRequired,
  spotifyLink: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ArtistDetails;
