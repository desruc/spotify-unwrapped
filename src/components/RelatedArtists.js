import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Heading = styled.h2`
  margin-top: 0px;
`;

const Card = styled.div`
  height: 100%;
  max-width: 100%;
  height: 1088px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  padding: 16px;
  @media (min-width: 768px) {
    height: auto;
    min-height: calc(544px - 32px);
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  flex: 1;
`;

const ListItem = styled.li`
  flex: 1;
  margin: 5px auto;
`;

const ArtistContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  min-height: 57px;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.tertiary};
    h4 {
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

const Artist = styled.h4`
  transition: all 0.2s ease-in-out;
  margin: 0;
`;

const RelatedArtists = ({ artists }) => {
  const history = useHistory();

  const onArtistClick = (artistId) => history.push(`/artist/${artistId}`);

  return (
    <>
      <Heading>Fans also like</Heading>
      <Card>
        <List>
          {artists.slice(10).map((artist) => (
            <ListItem>
              <ArtistContainer
                onClick={() => onArtistClick(artist.id)}
                role="presentation"
              >
                <Image src={artist.images[0]?.url} />
                <Artist>{artist.name}</Artist>
              </ArtistContainer>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

RelatedArtists.propTypes = {
  artists: PropTypes.array.isRequired,
};

export default RelatedArtists;
