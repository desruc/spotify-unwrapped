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
  while ((e = r.exec(q))) {
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
      if (!atFinalIdx) artistString += `${a.name} / `;
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
