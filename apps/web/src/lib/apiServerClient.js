const defaultApiBaseUrl = 'http://127.0.0.1:3001';
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl).replace(/\/$/, '');

function toUrl(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

const apiServerClient = {
  fetch(path, options) {
    return fetch(toUrl(path), options);
  },
};

export default apiServerClient;
