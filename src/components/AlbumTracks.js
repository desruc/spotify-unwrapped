import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import mixins from '../styles/mixins';
import { formatDuration } from '../utils/helpers';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
  min-height: 0px;
  padding: 8px;
  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.tertiary};
  }
`;

const TrackName = styled.h3`
  font-size: 14px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text};
  margin: 0px;
  flex: 1;
  width: 0px;
  ${mixins.overflowEllipsis}
`;

const FeatureArtist = styled.span`
  text-transform: initial;
  font-weight: 300;
  &:hover {
    color: ${({ theme }) => theme.main};
    text-decoration: underline;
  }
`;

const Duration = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const AlbumTracks = ({ tracks, albumArtists }) => {
  // Hooks
  const history = useHistory();

  // Event handlers
  const onTrackClick = (trackId) => {
    history.push(`/track/${trackId}`);
  };

  const onArtistClick = (e, artistId) => {
    e.stopPropagation();
    history.push(`/artist/${artistId}`);
  };

  return (
    <List>
      {tracks.map((track) => {
        const featuredArtists = track.artists.filter(
          (artist) => !albumArtists.some((a) => a.id === artist.id)
        );

        return (
          <ListItem
            key={track.id}
            onClick={(e) => {
              e.stopPropagation();
              onTrackClick(track.id);
            }}
            role="presentation"
          >
            <TrackName>
              {track.name}
              {featuredArtists.length > 0 && (
                <>
                  <span> - </span>
                  {featuredArtists.map(
                    ({ id: artistId, name: artistName }, idx) => (
                      <>
                        <FeatureArtist
                          onClick={(e) => onArtistClick(e, artistId)}
                        >
                          {artistName}
                        </FeatureArtist>
                        {featuredArtists.length > 0 &&
                        idx === featuredArtists.length - 1
                          ? ''
                          : ', '}
                      </>
                    )
                  )}
                </>
              )}
            </TrackName>
            <Duration>{formatDuration(track.duration_ms)}</Duration>
          </ListItem>
        );
      })}
    </List>
  );
};

AlbumTracks.propTypes = {
  tracks: PropTypes.array,
  albumArtists: PropTypes.array,
};

AlbumTracks.defaultProps = {
  tracks: [],
};

export default AlbumTracks;
