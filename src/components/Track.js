import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { formatDuration } from '../utils/helpers';

const ListItem = styled.li`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  flex: 1;
  max-width: 700px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  min-height: 57px;
  img {
    width: 100%;
    max-width: 100%;
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
  min-width: 50px;
  margin-right: 20px;
`;

const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  color: ${({ theme }) => theme.heading};
  user-select: none;
  cursor: pointer;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.tertiary};
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
  return (
    <ListItem>
      <Container>
        <div>
          <Artwork>
            {track.album.images.length && (
              <img src={track.album.images[2].url} alt="Album Artwork" />
            )}
          </Artwork>
        </div>
        <Meta>
          <MetaLeft>
            {track.name && <TrackName>{track.name}</TrackName>}
            {track.artists && track.album && (
              <Album>
                {track.artists &&
                  track.artists.map(({ name, id }, i) => (
                    <span key={id}>
                      {name}
                      {track.artists.length > 0 &&
                      i === track.artists.length - 1
                        ? ''
                        : ','}
                      &nbsp;
                    </span>
                  ))}
                &nbsp;&middot;&nbsp;&nbsp;
                {track.album.name}
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
