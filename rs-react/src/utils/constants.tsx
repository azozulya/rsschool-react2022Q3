const SEARCH_STRING_LS = 'search';

const COUNTRIES = ['Cyprus', 'France', 'Italy', 'Spain'];

const API_KEY = '14ef8b4215cdd8870297769e768727cf';

const API_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&nojsoncallback=1`;

const API_IMG_URL = 'https://live.staticflickr.com/';

const RESENT_PHOTOS_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=30`;

const IMG_EMPTY = 'No image';

const MAX_PHOTOS = 500;

const PER_PAGE = [5, 10, 20, 30, 40, 60];

const SORT_PARAMS = [
  'date-posted-desc',
  'date-posted-asc',
  'date-taken-asc',
  'date-taken-desc',
  'interestingness-desc',
  'interestingness-asc',
];

export {
  IMG_EMPTY,
  SEARCH_STRING_LS,
  COUNTRIES,
  API_KEY,
  API_URL,
  API_IMG_URL,
  RESENT_PHOTOS_URL,
  MAX_PHOTOS,
  PER_PAGE,
  SORT_PARAMS,
};
