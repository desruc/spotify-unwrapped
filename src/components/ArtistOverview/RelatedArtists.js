import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import ErrorMessage from '../Common/ErrorMessage';
import RelatedArtistLoading from './RelatedArtistLoading';
import Card from '../Common/Card';

import { randomId } from '../../utils/helpers';

import { artistPropType } from '../../constants/types';

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

const RelatedArtists = ({ loading, artists, error }) => {
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

  if (error)
    return (
      <ErrorMessage>There was an error retrieving related artists</ErrorMessage>
    );

  return (
    <>
      <h2>Fans also like</h2>
      <Card>
        <List>{loading ? loadingJsx : artistJsx}</List>
      </Card>
    </>
  );
};

RelatedArtists.propTypes = {
  loading: PropTypes.bool.isRequired,
  artists: PropTypes.arrayOf(artistPropType).isRequired,
  error: PropTypes.bool,
};

RelatedArtists.defaultProps = {
  error: false,
};

export default RelatedArtists;
