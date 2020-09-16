import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import RelatedArtistLoading from './RelatedArtistLoading';

import { randomId } from '../../utils/helpers';

const Heading = styled.h2`
  margin-top: 0px;
`;

const Card = styled.div`
  height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  padding: 16px;
`;

const List = styled.ul`
  flex: 1;
  transition: width 0.2s ease-in-out;
  margin: 0;
  padding: 0px;
  list-style: none;
  @media (min-width: 768px) {
    columns: 2;
  }
`;

const ListItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ArtistContainer = styled.div`
  cursor: pointer;
  flex: 1;
  max-width: 700px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  min-height: 55px;
  background-color: transparent;
  border-radius: 0px;
  transition: all 0.1s ease-in-out;
  border-bottom: 1px solid transparent;
  margin: 5px;
  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.tertiary};
    span {
      color: ${({ theme }) => theme.main};
    }
  }
`;

const Image = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 6px;
  background-size: cover;
  background-position: center center;
  background-image: url(${({ src }) => src});
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
`;

const Artist = styled.span`
  color: ${({ theme }) => theme.heading};
  transition: all 0.2s ease-in-out;
  margin: 0;
`;

const RelatedArtists = ({ loading, artists }) => {
  const history = useHistory();

  const onArtistClick = (artistId) => history.push(`/artist/${artistId}`);

  const loadingJsx = [...new Array(10)].map(() => (
    <RelatedArtistLoading key={randomId()} />
  ));

  const artistJsx = artists.slice(10).map((artist) => (
    <ListItem key={artist.id}>
      <ArtistContainer
        onClick={() => onArtistClick(artist.id)}
        role="presentation"
      >
        <Image src={artist.images[0]?.url} />
        <Artist>{artist.name}</Artist>
      </ArtistContainer>
    </ListItem>
  ));

  return (
    <>
      <Heading>Fans also like</Heading>
      <Card>
        <List>{loading ? loadingJsx : artistJsx}</List>
      </Card>
    </>
  );
};

RelatedArtists.propTypes = {
  loading: PropTypes.bool.isRequired,
  artists: PropTypes.array.isRequired,
};

export default RelatedArtists;
