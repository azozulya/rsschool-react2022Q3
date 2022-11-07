const SEARCH_STRING_LS = 'search';

const COUNTRIES = ['Cyprus', 'France', 'Italy', 'Spain'];

const API_KEY = '6fcb9620a842bea26304d7962404e1fe';

const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=true`;

const API_POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;

const API_IMG_URL = 'https://image.tmdb.org/t/p/w300';
// 'https://api.themoviedb.org/3/movie/920?api_key=6fcb9620a842bea26304d7962404e1fe&language=en-US';
const API_MOVIE_DETAILS_URL = 'https://api.themoviedb.org/3/movie/';

const IMG_EMPTY = 'No image';

export {
  IMG_EMPTY,
  SEARCH_STRING_LS,
  COUNTRIES,
  API_KEY,
  API_URL,
  API_IMG_URL,
  API_POPULAR_URL,
  API_MOVIE_DETAILS_URL,
};
