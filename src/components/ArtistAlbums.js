import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { getAlbumYear } from '../utils/helpers';

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  width: 100%;
`;

const AlbumWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;

const AlbumImage = styled.div`
  cursor: pointer;
  height: 180px;
  width: 180px;
  background-size: cover;
  background-position: center center;
  background-image: url(${({ image }) => image});
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  border-radius: 6px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 25px;
  }
`;

const AlbumTitle = styled.h5`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: center;
  &:hover {
    color: ${({ theme }) => theme.main};
  }
`;

const AlbumYear = styled.h6`
  transition: all 0.2s ease-in-out;
  margin: 0;
  color: ${({ theme }) => theme.secondary};
  text-align: center;
  user-select: none;
`;

const ArtistAlbums = ({ albums }) => {
  const history = useHistory();

  const goToAlbum = (albumId) => history.push(`/album/${albumId}`);

  return (
    <>
      <Heading>Albums</Heading>
      <Card>
        <Grid>
          {albums.map((a) => (
            <AlbumWrap key={a.id}>
              <AlbumImage
                image={a.images[0]?.url}
                title="Go to Album"
                onClick={() => goToAlbum(a.id)}
              />
              <AlbumTitle title="Go to Album" onClick={() => goToAlbum(a.id)}>
                {a.name}
              </AlbumTitle>
              <AlbumYear>{getAlbumYear(a)}</AlbumYear>
            </AlbumWrap>
          ))}
        </Grid>
      </Card>
    </>
  );
};

ArtistAlbums.propTypes = {
  albums: PropTypes.array,
};

ArtistAlbums.defaultProps = {
  albums: [],
};

export default ArtistAlbums;
