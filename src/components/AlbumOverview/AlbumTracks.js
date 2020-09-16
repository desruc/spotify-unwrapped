import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import List from '../Common/List';

import mixins from '../../styles/mixins';
import keyframes from '../../styles/keyframes';
import { formatDuration, randomId } from '../../utils/helpers';

const LoadingListItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
  min-height: 0px;
  padding: 8px;
`;

const LoadingText = styled.span`
  font-size: 14px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
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

const AlbumTracks = ({ loading, tracks, albumArtists }) => {
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

  const loadingJsx = [...new Array(10)].map(() => (
    <LoadingListItem key={randomId()}>
      <LoadingText>Loading</LoadingText>
    </LoadingListItem>
  ));

  const tracksJsx = tracks.map((track) => {
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
                  <Fragment key={artistId}>
                    <FeatureArtist onClick={(e) => onArtistClick(e, artistId)}>
                      {artistName}
                    </FeatureArtist>
                    {featuredArtists.length > 0 &&
                    idx === featuredArtists.length - 1
                      ? ''
                      : ', '}
                  </Fragment>
                )
              )}
            </>
          )}
        </TrackName>
        <Duration>{formatDuration(track.duration_ms)}</Duration>
      </ListItem>
    );
  });

  return <List>{loading ? loadingJsx : tracksJsx}</List>;
};

AlbumTracks.propTypes = {
  loading: PropTypes.bool.isRequired,
  tracks: PropTypes.array,
  albumArtists: PropTypes.array.isRequired,
};

AlbumTracks.defaultProps = {
  tracks: [],
};

export default AlbumTracks;
