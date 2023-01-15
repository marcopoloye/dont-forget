export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://dontforgetapi.netlify.app/'
    : 'http://localhost:8080';
