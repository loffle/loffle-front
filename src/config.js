const PROXY =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '192.168.219.104'
    ? ''
    : '/proxy';

const API_URL = 'http://loffle.cf';

const SESSION_ID = '3shon67npij42ss64st4xzu3jnfscznr';

const CSRF_TOKEN =
  '4kSrQLZUeGnQjqVinW5y5b3daYteSPMNRwqvmRHsCvJGQyZ21jv79kgpgnUJy6sr';

export { PROXY, API_URL, SESSION_ID, CSRF_TOKEN };
