/**
 * https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/public/index.html
 * Obtains parameters from the hash of the URL
 * @return Object
 */
export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) { // eslint-disable-line
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

export const capitalizeWords = (str) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

export const getTopGenres = (data) => {
  if (!data) return null;

  const genres = [];
  data.forEach((d) => {
    d.genres.forEach((g) => {
      genres.push(g);
    });
  });

  const counts = {};
  genres.forEach((g) => {
    counts[g] = (counts[g] || 0) + 1;
  });

  const sortable = [];
  const keys = Object.keys(counts);
  keys.forEach((k) => {
    sortable.push([capitalizeWords(k), counts[k]]);
  });

  return sortable.sort((a, b) => b[1] - a[1]);
};

export const getTopAlbums = (data) => {
  if (!data) return null;

  const albums = data.map((d) => d.album);

  const counts = {};
  albums.forEach((a) => {
    const { id } = a;
    counts[id] = (counts[id] || 0) + 1;
  });

  const sortable = [];
  const keys = Object.keys(counts);
  keys.forEach((k) => {
    sortable.push([albums.find((a) => a.id === k), counts[k]]);
  });

  return sortable.sort((a, b) => b[1] - a[1]);
};

export const getTrackWithArtist = (track) => {
  const { artists } = track;
  const computedArtists =
    artists.length > 1
      ? `${artists[0].name} (feat. ${artists.slice(1).map((a) => a.name)})`
      : artists[0].name;
  return `${computedArtists} - ${track.name}`;
};

export const getArtist = (data) => {
  const { artists } = data;

  const hasMultiple = artists.length > 1;

  if (hasMultiple) {
    let artistString = '';
    artists.forEach((a, idx) => {
      const atFinalIdx = idx === artists.length - 1;
      if (!atFinalIdx) artistString += `${a.name}, `;
      else artistString += a.name;
    });
    return artistString;
  }

  return artists[0].name;
};

export const getViewportName = (width) => {
  if (width < 768) return 'mobile';
  if (width < 992) return 'tablet';
  return 'desktop';
};

export const formatDuration = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return `${str.slice(0, num)}...`;
}

export const parseAudioFeatures = (data) => [
  {
    id: 'Acousticness',
    label: 'Acousticness',
    value: data.acousticness,
    color: 'hsl(254.8,83.3%,64.7%)',
  },
  {
    id: 'Danceability',
    label: 'Danceability',
    value: data.danceability,
    color: 'hsl(155.2,61.1%,44.3%)',
  },
  {
    id: 'Energy',
    label: 'Energy',
    value: data.energy,
    color: 'hsl(275.4,100%,73.7%)',
  },
  {
    id: 'Instrumentalness',
    label: 'Instrumentalness',
    value: data.instrumentalness,
    color: 'hsl(354.2,79.4%,62%)',
  },
  {
    id: 'Liveness',
    label: 'Liveness',
    value: data.liveness,
    color: 'hsl(200,53.8%,92.4%)',
  },
  {
    id: 'Speechiness',
    label: 'Speechiness',
    value: data.speechiness,
    color: 'hsl(199.8,100%,61.4%)',
  },
  {
    id: 'Valence',
    label: 'Valence',
    value: data.valence,
    color: 'hsl(60.3,92%,61%)',
  },
];

export const getAlbumYear = (album) =>
  new Date(album.release_date).getFullYear();

export const parsePitch = (note) => {
  let key = note;

  switch (note) {
  case 0:
    key = 'C';
    break;
  case 1:
    key = 'D♭';
    break;
  case 2:
    key = 'D';
    break;
  case 3:
    key = 'E♭';
    break;
  case 4:
    key = 'E';
    break;
  case 5:
    key = 'F';
    break;
  case 6:
    key = 'G♭';
    break;
  case 7:
    key = 'G';
    break;
  case 8:
    key = 'A♭';
    break;
  case 9:
    key = 'A';
    break;
  case 10:
    key = 'B♭';
    break;
  case 11:
    key = 'B';
    break;
  default:
    return null;
  }

  return key;
};

export const parseAnalysis = (analysis) => {
  if (!analysis) return null;
  return {
    pitch: parsePitch(analysis.track.key),
    modality: analysis.track.mode === 1 ? 'Major' : 'Minor',
    timeSignature: analysis.track.time_signature,
    tempo: Math.round(analysis.track.tempo),
    bars: analysis.bars.length,
    beats: analysis.beats.length,
    sections: analysis.sections.length,
    segments: analysis.segments.length,
  };
};

export const randomId = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

export const getAlbumDuration = (album) => {
  if (!album) return null;
  const {
    tracks: { items },
  } = album;
  let ms = 0;

  items.forEach((track) => {
    ms += track.duration_ms;
  });

  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);

  const seconds = s % 60;
  const minutes = m % 60;
  const hours = h % 24;

  return `${hours > 0 ? `${hours}h ` : ''}${minutes > 1 ? `${minutes}m ` : ''}${
    seconds > 1 ? `${seconds}s` : ''
  }`;
};
