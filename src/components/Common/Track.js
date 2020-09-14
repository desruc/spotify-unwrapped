import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import { SET_SELECTED_TRACK } from '../../store/types';

import { formatDuration } from '../../utils/helpers';

const ListItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Container = styled.div`
  cursor: pointer;
  flex: 1;
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
  }
`;

const Meta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;

const MetaLeft = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
`;

const Artwork = styled.div`
  display: flex;
  position: relative;
  width: 50px;
  height: 50px;
  min-width: 50px;
  margin-right: 20px;
  border-radius: 6px;
  background-position: center center;
  background-size: contain;
  background-image: url(${({ image }) => image});
`;

const TrackName = styled.span`
  margin-bottom: 5px;
  color: ${({ theme }) => theme.heading};
  user-select: none;
  cursor: pointer;
`;

const MetaText = styled.span`
  border-bottom: 1px solid transparent;
  color: ${({ theme }) => theme.text};
  user-select: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.main};
  }
`;

const Album = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
  font-size: 12px;
`;

const Duration = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const Track = ({ track }) => {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickTrack = (e) => {
    e.stopPropagation();
    const { id } = track;
    dispatch({ type: SET_SELECTED_TRACK, track });
    history.push(`/track/${id}`);
  };

  const onClickArtist = (e, artist) => {
    e.stopPropagation();
    const { id } = artist;
    history.push(`/artist/${id}`);
  };

  const onClickAlbum = (e) => {
    e.stopPropagation();
    const {
      album: { id },
    } = track;
    history.push(`/album/${id}`);
  };

  return (
    <ListItem>
      <Container onClick={onClickTrack}>
        <Artwork image={track?.album?.images[1]?.url} />
        <Meta>
          <MetaLeft>
            {track.name && (
              <TrackName onClick={onClickTrack}>{track.name}</TrackName>
            )}
            {track.artists && track.album && (
              <Album>
                {track.artists &&
                  track.artists.map((artist, i) => (
                    <MetaText
                      key={artist.id}
                      onClick={(e) => onClickArtist(e, artist)}
                    >
                      {artist.name}
                      {track.artists.length > 0 &&
                      i === track.artists.length - 1
                        ? ''
                        : ','}
                      &nbsp;
                    </MetaText>
                  ))}
                &nbsp;&middot;&nbsp;&nbsp;
                <MetaText onClick={onClickAlbum}>{track.album.name}</MetaText>
              </Album>
            )}
          </MetaLeft>
          <Duration>
            {track.duration_ms && (
              <span>{formatDuration(track.duration_ms)}</span>
            )}
          </Duration>
        </Meta>
      </Container>
    </ListItem>
  );
};

Track.propTypes = {
  track: PropTypes.object.isRequired,
};

export default Track;
