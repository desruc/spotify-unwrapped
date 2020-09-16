import PropTypes from 'prop-types';

export const artistPropType = PropTypes.shape({
  external_urls: PropTypes.shape({
    spotify: PropTypes.string,
  }),
  href: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  uri: PropTypes.string,
});

export const externalUrlsPropType = PropTypes.shape({
  spotify: PropTypes.string,
});

export const trackPropType = PropTypes.shape({
  artists: PropTypes.arrayOf(artistPropType),
  available_markets: PropTypes.arrayOf(PropTypes.string),
  disc_number: PropTypes.number,
  duration_ms: PropTypes.number,
  explicit: PropTypes.bool,
  external_urls: externalUrlsPropType,
  href: PropTypes.string,
  id: PropTypes.string,
  is_local: PropTypes.bool,
  name: PropTypes.string,
  preview_url: PropTypes.string,
  track_number: PropTypes.number,
  type: PropTypes.string,
  uri: PropTypes.string,
});

export const albumPropType = PropTypes.shape({
  album_group: PropTypes.string,
  album_type: PropTypes.string,
  artists: PropTypes.arrayOf(artistPropType),
  external_urls: externalUrlsPropType,
  href: PropTypes.string,
  id: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
      url: PropTypes.string,
    })
  ),
  is_playable: PropTypes.bool,
  name: PropTypes.string,
  release_date: PropTypes.string,
  release_date_precision: PropTypes.string,
  total_tracks: PropTypes.number,
  type: PropTypes.string,
  uri: PropTypes.string,
});
