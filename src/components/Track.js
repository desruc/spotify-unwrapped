import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { formatDuration } from '../utils/helpers';

const Container = styled.div`
  max-width: 700px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
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
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: 20px;
`;

const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid #ffffff;
  }
`;

const Album = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
  font-size: 12px;
`;

const Track = ({ track }) => {
  return (
    <li>
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
          <span>
            {track.duration_ms && (
              <span>{formatDuration(track.duration_ms)}</span>
            )}
          </span>
        </Meta>
      </Container>
    </li>
  );
};

Track.propTypes = {
  track: PropTypes.object.isRequired,
};

export default Track;
