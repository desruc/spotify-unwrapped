import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
  display: flex;
  min-height: 0px;
  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.tertiary};
  }
`;

const TrackName = styled.h3`
  color: ${({ theme }) => theme.text};
  margin: 0px;
`;

const AlbumTracks = ({ tracks }) => {
  const history = useHistory();

  const onTrackClick = (trackId) => history.push(`/track/${trackId}`);

  return (
    <List>
      {tracks.map((track) => (
        <ListItem onClick={() => onTrackClick(track.id)} role="presentation">
          <TrackName>{track.name}</TrackName>
        </ListItem>
      ))}
    </List>
  );
};

AlbumTracks.propTypes = {
  tracks: PropTypes.array,
};

AlbumTracks.defaultProps = {
  tracks: [],
};

export default AlbumTracks;
