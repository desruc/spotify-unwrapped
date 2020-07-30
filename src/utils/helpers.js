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
